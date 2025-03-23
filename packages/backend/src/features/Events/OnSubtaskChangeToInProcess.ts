import subtaskModel, { ISubtask } from "../subtask/subtask";
import { SubtaskStatus } from "../subtask/SubtaskStatus";
import { Task } from "../task/model/task";

export default function OnSubtaskChangeToInProcess() {
  // Filter change stream to only watch for InProcess status updates
  const changeStream = subtaskModel.watch([
    {
      $match: {
        "updateDescription.updatedFields.status": SubtaskStatus.InProcess
      }
    }
  ]);

  // Initialize service outside event handler
  changeStream.on("change", async (change) => {
    try {
      const { documentKey } = change;
      const id = documentKey._id;

      // First fetch the subtask to get taskId
      const subtask = await subtaskModel.findById(id).lean();
      if (!subtask) return;

      // Then fetch task with subtasks
      const task = await Task.findOne({ taskId: subtask.taskId })
        .populate({
          path: "subtasks",
          model: "Subtask",
          foreignField: "subtaskId",
          select: "status"
        })
        .lean();

      if (!task) return;

      // Early return if task is already in relevant states
      if (["in progress", "completed", "closed"].includes(task.status)) {
        return;
      }

      const fetchedTaskSubtasks = task.subtasks as unknown as ISubtask[];
      const hasInProcessSubtask = fetchedTaskSubtasks.some((subtask) => subtask.status === SubtaskStatus.InProcess);

      if (hasInProcessSubtask) {
        // Batch updates in parallel
        await Task.findOneAndUpdate({ taskId: task.taskId }, { status: "in progress" }, { new: true });
      }
    } catch (error) {
      console.error("Error watching subtask changes:", error);
    }
  });
}
