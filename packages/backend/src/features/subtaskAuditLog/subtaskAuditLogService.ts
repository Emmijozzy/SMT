import { v4 as uuidv4 } from "uuid";
import { IUser } from "../../features/auth/authModel";
import { ISubtask } from "../../features/subtask/subtask";
import { ISubtaskAuditLog } from "./subtaskAuditLog";
import SubtaskAuditLogRepository from "./subtaskAuditLogRepository";

export default class SubtaskAuditLogService {
  private subtaskAuditLogRepository: SubtaskAuditLogRepository;
  constructor() {
    this.subtaskAuditLogRepository = new SubtaskAuditLogRepository();
  }
  async createSubtaskAuditLog(subtaskAuditLogData: Partial<ISubtaskAuditLog>): Promise<ISubtaskAuditLog> {
    return await this.subtaskAuditLogRepository.create(subtaskAuditLogData);
  }
  async getSubtaskAuditLogs(): Promise<ISubtaskAuditLog[]> {
    return await this.subtaskAuditLogRepository.getSubtaskAuditLogs();
  }

  async LogOnSubtaskCreation(subtask: Partial<ISubtask>, user: Partial<IUser>): Promise<ISubtaskAuditLog> {
    // Validate required fields
    if (!subtask?.subtaskId || !user?.userId) {
      throw new Error("Missing required fields: subtaskId or userId");
    }

    const { subtaskId, checkLists, requiredFields, status } = subtask;
    const { userId, fullName = "", role = "" } = user;

    // Create audit log entry
    const subtaskAuditLogData: Partial<ISubtaskAuditLog> = {
      id: uuidv4(),
      subtaskId,
      action: "Subtask created",
      actor: {
        userId,
        name: fullName,
        role
      },
      details: {
        checklist: checkLists,
        requiredFields,
        decision: status ? `Status: ${status}` : "Status: Not set"
      }
    };

    // Create and return the audit log
    return this.createSubtaskAuditLog(subtaskAuditLogData);
  }

  async LogOnSubtaskStart(subtask: Partial<ISubtask>, user: Partial<IUser>): Promise<ISubtaskAuditLog> {
    // Validate required fields
    if (!subtask?.subtaskId || !user?.userId) {
      throw new Error("Missing required fields: subtaskId or userId");
    }

    const { subtaskId, status } = subtask;
    const { userId, fullName = "", role = "" } = user;

    // Create audit log entry
    const subtaskAuditLogData: Partial<ISubtaskAuditLog> = {
      id: uuidv4(),
      subtaskId,
      action: "Subtask started",
      actor: {
        userId,
        name: fullName,
        role
      },
      details: {
        decision: status ? `Status changed to ${status.replace("_", " ")}` : "Status changed to Not set"
      }
    };

    // Create and return the audit log
    return this.createSubtaskAuditLog(subtaskAuditLogData);
  }

  async LogOnSubtaskReview(subtask: Partial<ISubtask>, user: Partial<IUser>): Promise<ISubtaskAuditLog> {
    // Validate required fields
    if (!subtask?.subtaskId || !user?.userId) {
      throw new Error("Missing required fields: subtaskId or userId");
    }

    const { subtaskId, checkLists, requiredFields, status, comment } = subtask;
    const { userId, fullName = "", role = "" } = user;

    // Create audit log entry
    const subtaskAuditLogData: Partial<ISubtaskAuditLog> = {
      id: uuidv4(),
      subtaskId,
      action: "Subtask updated",
      actor: {
        userId,
        name: fullName,
        role
      },
      details: {
        checklist: checkLists,
        requiredFields,
        comment,
        decision: status ? `Status changed to ${status}` : "Status: Not set"
      }
    };

    // Create and return the audit log
    return this.createSubtaskAuditLog(subtaskAuditLogData);
  }

  async LogOnSubtaskRevisit(subtask: Partial<ISubtask>, user: Partial<IUser>): Promise<ISubtaskAuditLog> {
    // Validate required fields
    if (!subtask?.subtaskId || !user?.userId) {
      throw new Error("Missing required fields: subtaskId or userId");
    }

    const { subtaskId, checkLists, requiredFields, status, feedback } = subtask;
    const { userId, fullName = "", role = "" } = user;

    // Create audit log entry
    const subtaskAuditLogData: Partial<ISubtaskAuditLog> = {
      id: uuidv4(),
      subtaskId,
      action: "Subtask revisited",
      actor: {
        userId,
        name: fullName,
        role
      },
      details: {
        checklist: checkLists,
        requiredFields,
        feedback,
        decision: status ? `Status changed to ${status}` : "Status: Not set"
      }
    };

    // Create and return the audit log
    return this.createSubtaskAuditLog(subtaskAuditLogData);
  }

  async LogOnSubtaskApprove(subtask: Partial<ISubtask>, user: Partial<IUser>): Promise<ISubtaskAuditLog> {
    // Validate required fields
    if (!subtask?.subtaskId || !user?.userId) {
      throw new Error("Missing required fields: subtaskId or userId");
    }
    const { subtaskId, status, checkLists, requiredFields, feedback } = subtask;
    const { userId, fullName = "", role = "" } = user;
    // Create audit log entry
    const subtaskAuditLogData: Partial<ISubtaskAuditLog> = {
      id: uuidv4(),
      subtaskId,
      action: "Subtask approved",
      actor: {
        userId,
        name: fullName,
        role
      },
      details: {
        checklist: checkLists,
        requiredFields,
        feedback,
        decision: status ? `Status changed to ${status}` : "Status: Not set"
      }
    };
    // Create and return the audit log
    return this.createSubtaskAuditLog(subtaskAuditLogData);
  }

  async getSubtaskAuditLogsBySubtaskId(subtaskId: string): Promise<ISubtaskAuditLog[]> {
    return await this.subtaskAuditLogRepository.getSubtaskAuditLogsBySubtaskId(subtaskId);
  }
}
