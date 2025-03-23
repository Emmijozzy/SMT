import cacheService from "../../service/cacheService";
import { NotificationType } from "../notification/notification";
import NotificationService from "../notification/notificationService";
import subtaskModel, { ISubtask } from "../subtask/subtask";
import { SubtaskStatus } from "../subtask/SubtaskStatus";
import { Task } from "../task/model/task";

export const OnSubtaskDelete = () => {
  const notificationService = new NotificationService();
  // Create change stream with pre-delete trigger
  const changeStream = subtaskModel.watch([
    {
      $match: {
        operationType: "delete"
      }
    }
  ]);

  changeStream.on("change", async (change) => {
    try {
      const { documentKey } = change;
      const deletedSubtask = cacheService.get<ISubtask>(documentKey._id.toString());

      if (!deletedSubtask?.taskId) return;

      const task = await Task.findOne({ taskId: deletedSubtask.taskId })
        .populate({
          path: "subtasks",
          model: "Subtask",
          foreignField: "subtaskId",
          select: "status"
        })
        .lean();

      if (!task) return;

      const fetchedTaskSubtasks = task.subtasks as unknown as ISubtask[];
      const totalSubtasks = fetchedTaskSubtasks.length;

      if (totalSubtasks === 0) {
        await Task.findOneAndUpdate(
          { taskId: deletedSubtask.taskId },
          {
            progress: 0,
            status: "not started"
          }
        );
        return;
      }

      const completedSubtasks = fetchedTaskSubtasks.filter(
        (subtask) => subtask.status === SubtaskStatus.Completed
      ).length;

      const progress = Math.ceil((completedSubtasks / totalSubtasks) * 100);
      const newStatus = progress === 0 ? "not started" : "in progress";

      await Promise.all([
        Task.findOneAndUpdate(
          { taskId: deletedSubtask.taskId },
          {
            progress,
            status: newStatus
          }
        ),
        notificationService.createTaskNotification(deletedSubtask.taskId, NotificationType.TaskStatusUpdated)
      ]);
    } catch (error) {
      console.error("Error handling subtask deletion:", error);
    }
  });

  return changeStream;
};
