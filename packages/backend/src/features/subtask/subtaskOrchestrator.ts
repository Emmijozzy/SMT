import { TaskService } from "../../features/task/services/taskService";
import { default as teamService, default as TeamService } from "../../features/team/teamService";
import { UserService } from "../../features/users/services/userService";
import { BadRequestError, InternalError } from "../../utils/ApiError";
import { ISubtask } from "./subtask";
import SubtaskService from "./subtaskService";

export default class SubtaskOrchestrator {
  private subtaskService: SubtaskService;
  private userService: UserService;
  private teamService: teamService;
  private taskService: TaskService;

  constructor() {
    this.subtaskService = new SubtaskService();
    this.userService = new UserService();
    this.teamService = new TeamService();
    this.taskService = new TaskService();
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
      const subtask = await this.subtaskService.create(subtaskData, requesterUserId);

      await this.userService.addSubtaskId(user.userId, subtask.subtaskId);
      await this.teamService.addSubtaskToTeam(subtask.team, subtask.subtaskId);
      await this.taskService.addUserIdToAssignedTo(task.taskId, user.userId);
      await this.taskService.addSubtaskId(task.taskId, subtask.subtaskId);
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
}
