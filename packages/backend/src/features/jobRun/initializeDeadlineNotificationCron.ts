// cron/deadlineNotificationJob.ts
import cron from "node-cron";
import logger from "../../utils/logger";
import NotificationService from "../notification/notificationService";

export function initializeDeadlineNotificationCron(): void {
  const notificationService = new NotificationService();

  // Schedule to run twice daily - at 8 AM and 2 PM
  // The cron pattern is: minute hour day-of-month month day-of-week
  cron.schedule("0 2,14 * * *", async () => {
    console.log("Running deadline notification job at", new Date().toISOString());
    try {
      await notificationService.scheduleDeadlineNotifications();
      // await notificationService
      console.log("Deadline notification job completed successfully");
      logger.info("Deadline notification job completed successfully");
    } catch (error) {
      console.error("Deadline notification job failed:", error);
      logger.error("Deadline notification job failed:", error);
    }
  });

  console.log("Deadline notification cron job initialized");
}
