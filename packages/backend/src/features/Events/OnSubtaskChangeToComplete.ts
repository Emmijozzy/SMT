import { NotificationType } from "../notification/notification";
import NotificationService from "../notification/notificationService";
import subtaskModel, { ISubtask } from "../subtask/subtask";
import { SubtaskStatus } from "../subtask/SubtaskStatus";
import { Task } from "../task/model/task";

export const OnSubtaskChangeToComplete = () => {
  const changeStream = subtaskModel.watch([
    {
      $match: {
        "updateDescription.updatedFields.status": SubtaskStatus.Completed
      }
    }
  ]);

  const notificationService = new NotificationService();

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

      if (["completed", "closed", "not started"].includes(task.status)) return;

      const fetchedTaskSubtasks = task.subtasks as unknown as ISubtask[];
      const totalSubtasks = fetchedTaskSubtasks?.length || 0;

      if (totalSubtasks === 0) {
        await Task.updateOne({ taskId: task.taskId }, { progress: 0 });
        return;
      }

      // Calculate metrics once
      const completedSubtasks = fetchedTaskSubtasks.filter(
        (subtask) => subtask.status === SubtaskStatus.Completed
      ).length;

      const allSubtasksCompleted = completedSubtasks === totalSubtasks;
      const progress = Math.ceil((completedSubtasks / totalSubtasks) * 100);

      // Batch updates together
      await Promise.all([
        Task.updateOne(
          { taskId: task.taskId },
          {
            status: allSubtasksCompleted ? "completed" : "in progress",
            progress
          }
        ),
        notificationService.createTaskNotification(task.taskId, NotificationType.TaskStatusUpdated)
      ]);
    } catch (error) {
      console.error("Error watching subtask changes:", error);
    }
  });
};
