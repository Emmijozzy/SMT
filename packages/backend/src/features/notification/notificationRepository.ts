import logger from "../../utils/logger";
import Notification, { INotification } from "./notification";

export default class NotificationRepository {
  async create(notificationData: Partial<INotification>): Promise<INotification> {
    try {
      const newNotification = new Notification(notificationData);
      const notification = await newNotification.save();
      return notification;
    } catch (err: unknown) {
      const error = err as Error;
      logger.error("Error creating notification", error);
      throw new Error("Failed to create notification.  ERROR: " + error.message + " ");
    }
  }
  async getNotifications(): Promise<INotification[]> {
    try {
      const notifications = await Notification.find({}).exec();
      return notifications;
    } catch (err: unknown) {
      const error = err as Error;
      logger.error("Error fetching notifications", error);
      throw new Error("Failed to fetch notifications.  ERROR: " + error.message + " ");
    }
  }
  async getNotificationByRecipientId(recipientId: string): Promise<INotification[]> {
    try {
      const notifications = await Notification.find({
        recipientId: { $in: [recipientId] }
      }).exec();
      return notifications;
    } catch (err: unknown) {
      const error = err as Error;
      logger.error("Error fetching notifications", error);
      throw new Error("Failed to fetch notifications.  ERROR: " + error.message + " ");
    }
  }

  async getNotificationById(notificationId: string): Promise<INotification | null> {
    try {
      const notification = await Notification.findOne({ notificationId }).exec();
      return notification;
    } catch (err: unknown) {
      const error = err as Error;
      logger.error("Error fetching notification", error);
      throw new Error("Failed to fetch notification.  ERROR: " + error.message + " ");
    }
  }

  async deleteNotificationById(notificationId: string): Promise<void> {
    try {
      const deletedNotification = await Notification.findOneAndDelete({ notificationId }).exec();
      if (!deletedNotification) throw new Error(`Notification ${notificationId} not found or can't be deleted`);
    } catch (err: unknown) {
      const error = err as Error;
      logger.error("Error deleting notification", error);
      throw new Error("Failed to delete notification.  ERROR: " + error.message + " ");
    }
  }
}
