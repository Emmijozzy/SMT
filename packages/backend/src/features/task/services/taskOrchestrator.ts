/* eslint-disable @typescript-eslint/indent */
/* eslint-disable indent */
import generateTaskNotification from "../../../features/notification/generateTaskNotification";
import { INotification } from "../../../features/notification/notification";
import NotificationService from "../../../features/notification/notificationService";
import socketService from "../../../features/socket/socketService";
import TeamService from "../../../features/team/teamService";
import { ApiError, BadRequestError, InternalError, NotFoundError } from "../../../utils/ApiError";
import { ITask } from "../model/task";
import { TaskPayload } from "../tasksInterface";
import { TaskService } from "./taskService";

export class TaskOrchestrator {
  private taskService: TaskService;
  private TeamService: TeamService;
  private notificationService: NotificationService;

  constructor() {
    this.taskService = new TaskService();
    this.TeamService = new TeamService();
    this.notificationService = new NotificationService();
  }

  public async createTask(payload: TaskPayload): Promise<ITask> {
    try {
      const task = await this.taskService.createTask(payload);

      // Add task to team first to ensure team association
      await this.TeamService.addTaskToTeam(task.responsibleTeam, task.taskId);

      // Generate and handle notifications in parallel since they're independent operations
      const notificationPromise = generateTaskNotification.generateCreateTaskNotification(task);

      const notification = await notificationPromise;
      if (notification && Array.isArray(notification.recipientId) && notification.recipientId.length > 0) {
        const recipientId = notification.recipientId[0];

        // Execute notification related operations in parallel
        await Promise.all([
          this.notificationService.saveNotification(notification as INotification),
          socketService.taskEventHandler.emitTaskCreatedEvent(task, recipientId),
          socketService.notificationEventHandler.emitNewNotification(notification as INotification, recipientId)
        ]);
      }

      return task;
    } catch (err: unknown) {
      if (err instanceof ApiError) throw err;
      const error = err as Error;
      console.error("Error creating task:", error);
      throw new InternalError(`Failed to create task. ERROR: ${error.message}`, error.stack, __filename);
    }
  }

  public async updateTask(payload: Partial<ITask>): Promise<ITask> {
    try {
      const {
        taskId,
        title,
        description,
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

      const notificationMessageArray: string[] = [];
      const taskPayload: Partial<ITask> = {
        ...task,
        title: title || task.title,
        description: description || task.description,
        // priority: priority || task.priority,
        startDate: startDate ? new Date(startDate) : task.startDate
      };

      if (dueDate && new Date(dueDate).getTime() !== new Date(task.dueDate).getTime()) {
        taskPayload.dueDate = new Date(dueDate);
        notificationMessageArray.push("Task due date updated");
      }

      if (status && ["not started", "in progress", "completed", "closed"].includes(status) && status !== task.status) {
        taskPayload.status = status;
        notificationMessageArray.push(`Task status updated to ${status}`);
      }

      if (priority && ["low", "medium", "high"].includes(priority) && priority !== task.priority) {
        taskPayload.priority = priority;
        notificationMessageArray.push(`Task priority updated to ${priority}`);
      }

      const teamUpdatePromise =
        responsibleTeam && responsibleTeam !== task.responsibleTeam
          ? Promise.all([
              this.TeamService.removeTaskFromTeam(task.responsibleTeam, task.taskId),
              this.TeamService.addTaskToTeam(responsibleTeam, task.taskId)
            ]).then(() => {
              notificationMessageArray.push(`Task reassigned to team ${responsibleTeam}`);
              taskPayload.responsibleTeam = responsibleTeam;
            })
          : Promise.resolve();

      if (managerTask && managerTask !== task.managerTask) {
        if (!managerId) throw new BadRequestError("Manager ID is required");

        taskPayload.subtasks = [];
        taskPayload.assignedTo = [];
        taskPayload.managerId = managerId;
        taskPayload.managerTask = managerTask;
        notificationMessageArray.push(`Task reassigned to manager ${managerId}`);
      }

      await teamUpdatePromise;

      const [updatedTask, notification] = await Promise.all([
        this.taskService.updateTaskById(taskId, taskPayload),
        generateTaskNotification.generateUpdateTaskNotification(taskPayload as ITask, notificationMessageArray)
      ]);

      if (!updatedTask) throw new InternalError("Error updating task");

      if (notification?.recipientId?.[0]) {
        await Promise.all([
          this.notificationService.saveNotification(notification),
          socketService.notificationEventHandler.emitNewNotification(
            notification as INotification,
            notification.recipientId[0]
          ),
          socketService.taskEventHandler.emitTaskUpdatedEvent(updatedTask, notification.recipientId[0])
        ]);
      }

      return updatedTask;
    } catch (err: unknown) {
      if (err instanceof ApiError) throw err;
      const error = err as Error;
      console.error("Error updating task", error);
      throw new InternalError("Failed to update task.  ERROR: " + error.message + " ", error.stack, __filename);
    }
  }

  public async outrightDeleteTaskById(taskId: string): Promise<ITask | null> {
    try {
      const task = await this.taskService.getTaskById(taskId);
      if (!task) throw new NotFoundError("Task not found");
      //Check if task already has subtasks
      if (task.subtasks && task.subtasks.length > 0) {
        throw new BadRequestError("Cannot outright delete task with subtasks");
      }

      const deletedTask = await this.taskService.outrightDeleteById(taskId);
      const taskRemoved = await this.TeamService.removeTaskFromTeam(task.responsibleTeam, task.taskId);
      const notification = await generateTaskNotification.generateOutrightDeleteTaskNotification(task);

      if (notification?.recipientId?.[0]) {
        await Promise.all([
          this.notificationService.saveNotification(notification),
          socketService.taskEventHandler.emitTaskDeletedEvent(task.taskId, notification.recipientId[0])
        ]);
      }

      // await this.notificationService.createTaskNotification(task.taskId, NotificationType.TaskDeleted);
      if (!deletedTask || !taskRemoved) throw new InternalError("Error deleting task");
      console.log("Task deleted successfully");
      return deletedTask;
    } catch (err: unknown) {
      if (err instanceof ApiError) throw err;
      const error = err as Error;
      console.error("Error deleting task", error);
      throw new InternalError("Failed to delete task ERROR: " + error.message + " ", error.stack, __filename);
    }
  }
}
