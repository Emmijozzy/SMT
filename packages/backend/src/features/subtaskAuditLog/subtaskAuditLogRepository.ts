import { BadRequestError, InternalError } from "../../utils/ApiError";
import SubtaskAuditLog, { ISubtaskAuditLog } from "./subtaskAuditLog";

export default class SubtaskAuditLogRepository {
  async create(subtaskAuditLogData: Partial<ISubtaskAuditLog>): Promise<ISubtaskAuditLog> {
    try {
      const newSubtaskAuditLog = new SubtaskAuditLog(subtaskAuditLogData);
      const subtaskAuditLog = await newSubtaskAuditLog.save();
      return subtaskAuditLog;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error creating subtask", error);

      if (error.name === "Validation") {
        throw new BadRequestError("Invalid subtask data provided");
      } else {
        throw new InternalError(
          "Failed to create subtask Audit log.  ERROR: " + error.message + " ",
          error.stack,
          __filename
        );
      }
    }
  }
  async getSubtaskAuditLogs(): Promise<ISubtaskAuditLog[]> {
    try {
      const subtaskAuditLogs = await SubtaskAuditLog.find().lean().exec();
      return subtaskAuditLogs;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error fetching subtask", error);
      throw new InternalError(
        "Failed to fetch subtask Audit logs.  ERROR: " + error.message + " ",
        error.stack,
        __filename
      );
    }
  }

  async getSubtaskAuditLogsBySubtaskId(subtaskId: string): Promise<ISubtaskAuditLog[]> {
    try {
      const subtaskAuditLogs = await SubtaskAuditLog.find({ subtaskId }).lean().exec();
      return subtaskAuditLogs;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error fetching subtask", error);
      throw new InternalError(
        "Failed to fetch subtask Audit logs.  ERROR: " + error.message + " ",
        error.stack,
        __filename
      );
    }
  }
}
