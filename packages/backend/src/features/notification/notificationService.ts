import SubtaskRepository from "../../features/subtask/subtaskRepository";
import { UserRepository } from "../../features/users/userRepository";
import { InternalError } from "../../utils/ApiError";
import { INotification, NotificationResourceType, NotificationStatus, NotificationType } from "./notification";
import NotificationRepository from "./notificationRepository";

export default class NotificationService {
  private notificationRepository: NotificationRepository;
  private readonly subtaskRepository: SubtaskRepository;
  private readonly userRepository: UserRepository;

  constructor() {
    this.notificationRepository = new NotificationRepository();
    this.subtaskRepository = new SubtaskRepository();
    this.userRepository = new UserRepository();
  }

  async createNotification(
    notificationData: Omit<INotification, "recipientId"> & { recipientId: string[] }
  ): Promise<INotification> {
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

  async scheduleDeadlineNotifications(): Promise<void> {
    try {
      const now = new Date();
      const approachingDeadlinesSubtasks = await this.subtaskRepository.findApproachingDeadlinesSubtasks();

      if (approachingDeadlinesSubtasks.length > 0) {
        for (const subtask of approachingDeadlinesSubtasks) {
          const assignedUser = await this.userRepository.findById(subtask.assignee);
          if (!assignedUser) {
            throw new Error(`User ${subtask.assignee} not found as assigned to subtask ${subtask.subtaskId}`);
          }

          const creatorUser = await this.userRepository.findById(subtask.createdBy);
          if (!creatorUser) {
            throw new Error(`User ${subtask.createdBy} not found as creator of subtask ${subtask.subtaskId}`);
          }

          // Format the due date for display
          // const formattedDueDate = subtask.dueDate
          // ? subtask.dueDate.toLocaleString('en-US', {
          //     month: 'short',
          //     day: 'numeric',
          //     hour: '2-digit',
          //     minute: '2-digit'
          //   })
          // : 'Unknown';

          // Determine time remaining until deadline
          const hoursRemaining = subtask.dueDate
            ? Math.round((subtask.dueDate.getTime() - now.getTime()) / (1000 * 60 * 60))
            : 24;

          const notificationData: Partial<INotification> = {
            recipientId: [assignedUser?.userId, creatorUser?.userId],
            senderId: ["system"],
            title: "Subtask Deadline Reminder",
            type: NotificationType.subtaskDeadlineApproaching,
            message: `Subtask with ID:"${subtask.title}" is due in ${hoursRemaining} hours.`,
            createdAt: now,
            status: NotificationStatus.Unread,
            resourceId: subtask.subtaskId,
            resourceType: NotificationResourceType.Subtask,
            metaData: {
              subtaskId: subtask.subtaskId,
              subtaskTitle: subtask.title,
              dueDate: subtask.dueDate
            }
          };

          await this.notificationRepository.create(notificationData);

          await this.subtaskRepository.updateSubtask(subtask.subtaskId, {
            deadlineNotificationSent: true
          });
        }
      }

      const overdueSubtasks = await this.subtaskRepository.findOverdueSubtasks();
      if (overdueSubtasks.length > 0) {
        for (const subtask of overdueSubtasks) {
          const assignedUser = await this.userRepository.findById(subtask.assignee);
          if (!assignedUser) {
            throw new Error(`User ${subtask.assignee} not found as assigned to subtask ${subtask.subtaskId}`);
          }

          const creatorUser = await this.userRepository.findById(subtask.createdBy);
          if (!creatorUser) {
            throw new Error(`User ${subtask.createdBy} not found as creator of subtask ${subtask.subtaskId}`);
          }
          const notificationData: Partial<INotification> = {
            recipientId: [assignedUser?.userId, creatorUser?.userId],
            senderId: ["system"],
            title: "Subtask Deadline Reminder",
            type: NotificationType.subtaskDeadlineOverdue,
            message: `Subtask with ID:"${subtask.title}" is overdue.`,
            createdAt: now,
            status: NotificationStatus.Unread,
            resourceId: subtask.subtaskId,
            resourceType: NotificationResourceType.Subtask,
            metaData: {
              subtaskId: subtask.subtaskId,
              subtaskTitle: subtask.title,
              dueDate: subtask.dueDate
            }
          };
          await this.notificationRepository.create(notificationData);
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
