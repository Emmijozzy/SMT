import TeamService from "../../../features/team/teamService";
import { BadRequestError, InternalError, NotFoundError } from "../../../utils/ApiError";
import { ITask } from "../model/task";
import { TaskPayload } from "../tasksInterface";
import { TaskService } from "./taskService";

export class TaskOrchestrator {
  private taskService: TaskService;
  private TeamService: TeamService;

  constructor() {
    this.taskService = new TaskService();
    this.TeamService = new TeamService();
  }

  public async createTask(payload: TaskPayload): Promise<ITask> {
    try {
      const task = await this.taskService.createTask(payload);
      await this.TeamService.addTaskToTeam(task.responsibleTeam, task.taskId);
      return task;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error adding task to team", error);
      throw new InternalError("Failed to add task to team.  ERROR: " + error.message + " ", error.stack, __filename);
    }
  }

  public async updateTask(payload: Partial<ITask>): Promise<ITask> {
    try {
      const {
        taskId,
        title,
        description,
        assignedTo,
        responsibleTeam,
        status,
        managerTask,
        managerId,
        priority,
        startDate,
        dueDate
      } = payload;
      if (!taskId) throw new BadRequestError("Task ID is required");

      const task = (await this.taskService.getTaskById(taskId)) as ITask;
      if (!task) throw new NotFoundError("Task not found");

      const taskPayload: Partial<ITask> = {
        ...task,

        title: title || task.title,
        description: description || task.description,
        priority: priority || task.priority,
        dueDate: dueDate ? new Date(dueDate) : task.dueDate,
        startDate: startDate ? new Date(startDate) : task.startDate
      };

      // Use enum for task statuses
      if (status === "not started" || status === "in progress" || status === "completed" || status === "closed") {
        taskPayload.status = status;
      }

      if (assignedTo && assignedTo.length !== task.assignedTo.length) {
        taskPayload.assignedTo = assignedTo;
      }

      if (responsibleTeam && responsibleTeam !== task.responsibleTeam) {
        await this.TeamService.removeTaskFromTeam(task.responsibleTeam, task.taskId);
        await this.TeamService.addTaskToTeam(responsibleTeam, task.taskId);
        taskPayload.responsibleTeam = responsibleTeam;
      }

      if (managerTask && managerTask !== task.managerTask) {
        if (managerTask && !managerId) {
          throw new BadRequestError("Manager ID is required");
        }

        taskPayload.subtasks = [];
        taskPayload.assignedTo = [];
        taskPayload.managerId = managerId || "";
        taskPayload.managerTask = managerTask;
      }
      const UpdatedTask = await this.taskService.updateTaskById(taskId, taskPayload);
      if (!UpdatedTask) throw new InternalError("Error updating task");
      return UpdatedTask;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error updating task", error);
      throw new InternalError("Failed to update task.  ERROR: " + error.message + " ", error.stack, __filename);
    }
  }

  public async outrightDeleteTaskById(taskId: string): Promise<ITask | null> {
    try {
      const task = await this.taskService.getTaskById(taskId);
      if (!task) throw new NotFoundError("Task not found");
      const deletedTask = await this.taskService.outrightDeleteById(taskId);
      const taskRemoved = await this.TeamService.removeTaskFromTeam(task.responsibleTeam, task.taskId);
      if (!deletedTask || !taskRemoved) throw new InternalError("Error deleting task");
      console.log("Task deleted successfully");
      return deletedTask;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error deleting task", error);
      throw new InternalError("Failed to delete task ERROR: " + error.message + " ", error.stack, __filename);
    }
  }
}
