import { ISubtaskAuditLog } from "features/subtaskAuditLog/subtaskAuditLog";
import SubtaskAuditLogService from "../../features/subtaskAuditLog/subtaskAuditLogService";
import { TaskService } from "../../features/task/services/taskService";
import { default as teamService, default as TeamService } from "../../features/team/teamService";
import { UserService } from "../../features/users/services/userService";
import { BadRequestError, InternalError } from "../../utils/ApiError";
import { ISubtask } from "./subtask";
import { InReviewFeedBackData, InReviewUpdateData } from "./subtaskInterfaces";
import SubtaskService from "./subtaskService";

export default class SubtaskOrchestrator {
  private subtaskService: SubtaskService;
  private userService: UserService;
  private teamService: teamService;
  private taskService: TaskService;
  private subtaskAuditLogService: SubtaskAuditLogService;

  constructor() {
    this.subtaskService = new SubtaskService();
    this.userService = new UserService();
    this.teamService = new TeamService();
    this.taskService = new TaskService();
    this.subtaskAuditLogService = new SubtaskAuditLogService();
  }

  async createSubtask(subtaskData: Partial<ISubtask>, requesterUserId: string): Promise<ISubtask> {
    try {
      const { assignee, taskId } = subtaskData;

      if (!assignee) throw new BadRequestError("Assignee is required");
      if (!taskId) throw new BadRequestError("TaskId is required");
      const user = await this.userService.getUserById(assignee);
      if (!user) throw new BadRequestError("Assignee not found");
      const task = await this.taskService.getTaskById(taskId);
      if (!task) throw new BadRequestError("Task not found");

      const reqUser = await this.userService.getUserById(requesterUserId);
      if (!reqUser) throw new BadRequestError("request user not found");

      const subtask = await this.subtaskService.create(subtaskData, requesterUserId);

      await this.userService.addSubtaskId(user.userId, subtask.subtaskId);
      await this.teamService.addSubtaskToTeam(subtask.team, subtask.subtaskId);
      await this.taskService.addUserIdToAssignedTo(task.taskId, user.userId);
      await this.taskService.addSubtaskId(task.taskId, subtask.subtaskId);
      await this.subtaskAuditLogService.LogOnSubtaskCreation(subtask, reqUser);
      return subtask;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error creating subtask", error);
      throw new InternalError("Failed to create subtasks.  ERROR: " + error.message + " ", error.stack, __filename);
    }
  }

  async updateSubtask(subtaskData: Partial<ISubtask>, requesterUserId: string): Promise<ISubtask> {
    try {
      if (!requesterUserId) throw new BadRequestError("User ID is required");

      const { subtaskId } = subtaskData;
      if (!subtaskId) throw new BadRequestError("Subtask ID is required");

      const subtask = await this.subtaskService.getSubtaskById(subtaskId);
      if (!subtask) throw new BadRequestError("Subtask not found");

      //check for change of team and perform update logic
      if (subtaskData.team && subtask.team !== subtaskData.team) {
        await this.teamService.removeSubtaskFromTeam(subtask.team, subtask.subtaskId);
        await this.teamService.addSubtaskToTeam(subtaskData.team, subtask.subtaskId);
      }

      //check for change of assignee and perform update logic
      if (subtaskData.taskId && subtaskData.assignee && subtask.assignee !== subtaskData.assignee) {
        await this.userService.removeSubtaskId(subtask.assignee, subtask.subtaskId);
        await this.userService.addSubtaskId(subtaskData.assignee, subtask.subtaskId);
        await this.taskService.removeUserIdFromAssignedTo(subtask.taskId, subtask.assignee);
        await this.taskService.addUserIdToAssignedTo(subtaskData.taskId, subtaskData.assignee);
      }

      //check for change of task and perform update logic
      if (subtaskData.taskId && subtask.taskId !== subtaskData.taskId) {
        await this.taskService.removeSubtaskId(subtask.taskId, subtask.subtaskId);
        await this.taskService.addSubtaskId(subtaskData.taskId, subtask.subtaskId);
      }

      if (!subtask) throw new BadRequestError("Subtask not found");
      const updatedSubtask = await this.subtaskService.updateSubtaskById(subtaskId, subtaskData, requesterUserId);
      if (!updatedSubtask) throw new BadRequestError("Error updating subtask");

      return updatedSubtask;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error updating subtask");
      throw new InternalError("Failed to update subtasks.  ERROR: " + error.message + " ", error.stack, __filename);
    }
  }

  async deleteSubtask(subtaskId: string): Promise<ISubtask> {
    try {
      const subtask = await this.subtaskService.getSubtaskById(subtaskId);
      if (!subtask) throw new BadRequestError("Error deleting subtask");
      await this.userService.removeSubtaskId(subtask.assignee, subtask.subtaskId);
      await this.teamService.removeSubtaskFromTeam(subtask.team, subtask.subtaskId);
      await this.taskService.removeSubtaskId(subtask.taskId, subtask.subtaskId);
      await this.taskService.removeUserIdFromAssignedTo(subtask.taskId, subtask.assignee);
      await this.subtaskService.deleteSubtaskById(subtaskId);
      return subtask;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error deleting subtask", error);
      throw new InternalError("Failed to delete subtasks.  ERROR: " + error.message + " ", error.stack, __filename);
    }
  }

  async updateSubtaskFromOpenToInProcess(subtaskId: string, userId: string): Promise<ISubtask | null> {
    try {
      const user = await this.userService.getUserById(userId);
      if (!user) throw new BadRequestError("User not found");

      const updatedSubtask = await this.subtaskService.updateSubtaskFromOpenToInProcess(subtaskId);
      if (!updatedSubtask) throw new InternalError("Error in transition to In Process");

      await this.subtaskAuditLogService.LogOnSubtaskStart(updatedSubtask, user);

      return updatedSubtask;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to update subtask status ERR:" + error.message, "", __filename);
    }
  }

  async updateSubtaskFromToInReview(
    subtaskId: string,
    inReviewUpdateData: InReviewUpdateData,
    userId: string
  ): Promise<ISubtask | null> {
    try {
      const user = await this.userService.getUserById(userId);
      if (!user) throw new BadRequestError("Assignee not found");

      const updatedSubtask = await this.subtaskService.updateSubtaskFromToInReview(subtaskId, inReviewUpdateData);
      if (!updatedSubtask) throw new InternalError("Error in transition to In Review");

      await this.subtaskAuditLogService.LogOnSubtaskReview(updatedSubtask, user);

      return updatedSubtask;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to update subtask status ERR:" + error.message, "", __filename);
    }
  }
  async updateSubtaskFromInReviewToRevisit(
    subtaskId: string,
    revisitUpdateData: InReviewFeedBackData,
    userId: string
  ): Promise<ISubtask | null> {
    try {
      const user = await this.userService.getUserById(userId);
      if (!user) throw new BadRequestError("Assignee not found");

      const updatedSubtask = await this.subtaskService.updateSubtaskFromInReviewToRevisit(subtaskId, revisitUpdateData);
      if (!updatedSubtask) throw new InternalError("Error in transition to Revisit");

      await this.subtaskAuditLogService.LogOnSubtaskRevisit(updatedSubtask, user);

      return updatedSubtask;
    } catch (err) {
      const error = err as Error;
      console.error(`Subtask revisit failed: ${error.message}`);
      throw new InternalError(`Failed to update subtask status: ${error.message}`, "", __filename);
    }
  }

  async updateSubtaskFromInReviewToCompleted(
    subtaskId: string,
    completedUpdateData: InReviewFeedBackData,
    userId: string
  ): Promise<ISubtask | null> {
    try {
      const user = await this.userService.getUserById(userId);
      if (!user) throw new BadRequestError("Assignee not found");

      const updatedSubtask = await this.subtaskService.updateSubtaskFromInReviewToCompleted(
        subtaskId,
        completedUpdateData
      );
      if (!updatedSubtask) throw new InternalError("Error in transition to Complete");

      await await this.subtaskAuditLogService.LogOnSubtaskApprove(updatedSubtask, user);

      return updatedSubtask;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to update subtask status ERR:" + error.message, "", __filename);
    }
  }

  async getSubtaskAuditLogBySubtaskId(subtaskId: string): Promise<ISubtaskAuditLog[]> {
    try {
      const auditLogs = await this.subtaskAuditLogService.getSubtaskAuditLogsBySubtaskId(subtaskId);
      return auditLogs;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to get subtask audit logs ERR:" + error.message, "", __filename);
    }
  }
}
