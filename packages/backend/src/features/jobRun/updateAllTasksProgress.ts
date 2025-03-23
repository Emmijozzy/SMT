import { ISubtask } from "../../features/subtask/subtask";
import { SubtaskStatus } from "../../features/subtask/SubtaskStatus";
import { Task } from "../task/model/task";

export const updateAllTasksProgress = async () => {
  try {
    const tasks = await Task.find({})
      .populate({
        path: "subtasks",
        model: "Subtask",
        foreignField: "subtaskId",
        select: ""
      })
      .lean()
      .exec();

    if (!tasks || tasks.length === 0) {
      console.error("No tasks found");
      return;
    }

    tasks.forEach(async (task) => {
      const taskSubtasks = task.subtasks as unknown as ISubtask[];
      let completedSubtasks;
      const totalSubtasks = taskSubtasks?.length ? taskSubtasks.length : 0;

      if (totalSubtasks === 0) {
        const progress = 0;
        await Task.updateOne({ taskId: task.taskId }, { progress }).exec();
        console.log(`Task ${task.taskId} progress updated to ${progress}%`);
        return;
      } else {
        completedSubtasks = taskSubtasks.filter((subtask) => subtask.status === SubtaskStatus.Completed).length;
      }

      const progress = Math.ceil((completedSubtasks / totalSubtasks) * 100);
      await Task.updateOne({ taskId: task.taskId }, { progress }).exec();
      console.log(`Task ${task.taskId} progress updated to ${progress}%`);
    });
  } catch (error) {
    console.error("Error updating task progress:", error);
  }
};
