/* eslint-disable indent */
import socketService from "../../features/socket/socketService";
import SubtaskRepository from "../../features/subtask/subtaskRepository";
import { TaskRepository } from "../../features/task/taskRepository";
import TeamRepository from "../../features/team/teamRepository";
import { UserRepository } from "../../features/users/userRepository";
import { InternalError } from "../../utils/ApiError";
import { generateTitleandMessage } from "../../utils/generateTitleandMessage";
import generateSubtaskNotification from "./generateSubtaskNotification";
import {
  INotification,
  NotificationMetadata,
  NotificationResourceType,
  NotificationStatus,
  NotificationType
} from "./notification";
import NotificationRepository from "./notificationRepository";

export default class NotificationService {
  private notificationRepository: NotificationRepository;
  private readonly subtaskRepository: SubtaskRepository;
  private readonly userRepository: UserRepository;
  private readonly taskRepository: TaskRepository;
  private readonly teamRepository: TeamRepository;

  constructor() {
    this.notificationRepository = new NotificationRepository();
    this.subtaskRepository = new SubtaskRepository();
    this.userRepository = new UserRepository();
    this.taskRepository = new TaskRepository();
    this.teamRepository = new TeamRepository();
  }

  async saveNotification(notificationData: Partial<INotification>): Promise<INotification> {
    try {
      const notification = await this.notificationRepository.create(notificationData);
      return notification;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error creating notification", error);
      throw new InternalError("Failed to create notification.  ERROR: " + error.message + " ", error.stack, __filename);
    }
  }

  async getNotificationsByRecipientId(recipientId: string): Promise<INotification[]> {
    try {
      const notifications = await this.notificationRepository.getNotificationByRecipientId(recipientId);
      return notifications;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error fetching notifications", error);
      throw new InternalError("Failed to fetch notifications.  ERROR: " + error.message + " ", error.stack, __filename);
    }
  }

  async markNotificationAsRead(notificationId: string): Promise<void> {
    try {
      const notification = await this.notificationRepository.getNotificationById(notificationId);
      if (!notification) {
        throw new Error(`Notification ${notificationId} not found`);
      }
      notification.status = NotificationStatus.Read;
      notification.readAt = new Date();
      await notification.save();
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error marking notification as read", error);
      throw new InternalError(
        "Failed to mark notification as read.  ERROR: " + error.message + " ",
        error.stack,
        __filename
      );
    }
  }

  async markNotificationAsUnread(notificationId: string): Promise<void> {
    try {
      const notification = await this.notificationRepository.getNotificationById(notificationId);
      if (!notification) {
        throw new Error(`Notification ${notificationId} not found`);
      }
      notification.status = NotificationStatus.Unread;
      notification.readAt = undefined;
      await notification.save();
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error marking notification as unread", error);
      throw new InternalError(
        "Failed to mark notification as unread.  ERROR: " + error.message + " ",
        error.stack,
        __filename
      );
    }
  }

  async deleteNotificationById(notificationId: string): Promise<void> {
    try {
      await this.notificationRepository.deleteNotificationById(notificationId);
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error deleting notification", error);
      throw new InternalError("Failed to delete notification.  ERROR: " + error.message + " ", error.stack, __filename);
    }
  }

  async createTaskNotification(taskId: string, notificationType: NotificationType): Promise<INotification> {
    try {
      const task = await this.taskRepository.findById(taskId);

      if (!task) {
        throw new Error(`Task ${taskId} not found`);
      }
      const hoursRemaining = task.dueDate
        ? Math.ceil((task.dueDate.getTime() - Date.now()) / (1000 * 60 * 60)).toString()
        : undefined;

      const dayRemaining = task.dueDate
        ? Math.ceil((task.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))?.toString()
        : undefined;

      const metadata: NotificationMetadata = {
        taskId: taskId,
        hoursRemaining: hoursRemaining,
        remainingDays: dayRemaining,
        status: task.status
      };

      const teamManager = (await this.teamRepository.findTeamById(task.responsibleTeam)).managerId;

      if (!teamManager) {
        throw new Error(`Team manager not found for team ${task.responsibleTeam}`);
      }

      const { title, message } = generateTitleandMessage(notificationType, metadata);

      const notification = await this.saveNotification({
        recipientId: [teamManager],
        senderId: [task.modifiedBy ? task.modifiedBy : task.createdBy ? task.createdBy : "SYSTEM"],
        title,
        message,
        resourceId: taskId,
        resourceType: NotificationResourceType.Task,
        status: NotificationStatus.Unread,
        type: notificationType,
        metadata: metadata
      });
      return notification;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error creating task notification", error);
      throw new InternalError(
        "Failed to create task notification.  ERROR: " + error.message + " ",
        error.stack,
        __filename
      );
    }
  }

  async scheduleDeadlineNotifications(): Promise<void> {
    try {
      const approachingDeadlinesSubtasks = await this.subtaskRepository.findApproachingDeadlinesSubtasks();

      if (approachingDeadlinesSubtasks.length > 0) {
        for (const subtask of approachingDeadlinesSubtasks) {
          const notification = generateSubtaskNotification.generateSubtaskDeadlineApproachingNotification(subtask);
          const savedNotification = await this.saveNotification(notification);
          socketService.notificationEventHandler.emitNewNotification(savedNotification, subtask.assignee);
          socketService.notificationEventHandler.emitNewNotification(savedNotification, subtask.createdBy);

          await this.subtaskRepository.updateSubtask(subtask.subtaskId, {
            deadlineNotificationSent: true
          });
        }
      }

      const overdueSubtasks = await this.subtaskRepository.findOverdueSubtasks();
      if (overdueSubtasks.length > 0) {
        for (const subtask of overdueSubtasks) {
          const notification = generateSubtaskNotification.generateSubtaskOverdueNotification(subtask);
          const savedNotification = await this.saveNotification(notification);
          socketService.notificationEventHandler.emitNewNotification(savedNotification, subtask.assignee);
          socketService.notificationEventHandler.emitNewNotification(savedNotification, subtask.createdBy);

          await this.subtaskRepository.updateSubtask(subtask.subtaskId, {
            overdueNotificationSent: true
          });
        }
      }
    } catch (error) {
      console.error("Error scheduling deadline notifications:", error);
      throw new Error("Failed to schedule deadline notifications");
    }
  }
}
