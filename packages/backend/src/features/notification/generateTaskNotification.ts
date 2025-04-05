import { ITask } from "../../features/task/model/task";
import TeamRepository from "../../features/team/teamRepository";
import { NotFoundError } from "../../utils/ApiError";
import { INotification, NotificationResourceType, NotificationType } from "./notification";

export default class generateTaskNotification {
  private static teamRepository = new TeamRepository();

  public static async generateCreateTaskNotification(task: ITask): Promise<Partial<INotification>> {
    const teamManager = (await this.teamRepository.getTeamById(task.responsibleTeam)).managerId;
    if (!teamManager) {
      throw new NotFoundError("Team manager not found");
    }

    return {
      type: NotificationType.TaskCreated,
      resourceType: NotificationResourceType.Task,
      resourceId: task.taskId,
      senderId: [task.createdBy],
      recipientId: [teamManager],
      title: `New Task: ${task.taskId} Created`,
      message: `A new task has been created by ${task.createdBy} and assigned to your team`,
      metadata: {
        taskId: task.taskId,
        title: task.title,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        dueDate: task.dueDate,
        responsibleTeam: task.responsibleTeam,
        assignedTo: task.assignedTo,
        managerTask: task.managerTask,
        managerId: task.managerId
      }
    };
  }

  public static async generateUpdateTaskNotification(task: ITask, msgArray: string[]): Promise<Partial<INotification>> {
    const teamManager = (await this.teamRepository.getTeamById(task.responsibleTeam)).managerId;
    if (!teamManager) {
      throw new NotFoundError("Team manager not found");
    }

    return {
      type: NotificationType.TaskUpdated,
      resourceType: NotificationResourceType.Task,
      resourceId: task.taskId,
      senderId: [task.createdBy],
      recipientId: [teamManager],
      title: `Task Updated for ${task.taskId}`,
      message: `Task has been updated: ${msgArray.join(", ")}`,
      metadata: {
        taskId: task.taskId,
        title: task.title,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        dueDate: task.dueDate,
        responsibleTeam: task.responsibleTeam,
        assignedTo: task.assignedTo,
        managerTask: task.managerTask,
        managerId: task.managerId
      }
    };
  }

  public static async generateOutrightDeleteTaskNotification(task: ITask): Promise<Partial<INotification>> {
    const teamManager = (await this.teamRepository.getTeamById(task.responsibleTeam)).managerId;
    if (!teamManager) {
      throw new NotFoundError("Team manager not found");
    }

    return {
      type: NotificationType.TaskDeleted,
      resourceType: NotificationResourceType.Task,
      resourceId: task.taskId,
      senderId: [task.createdBy],
      recipientId: [teamManager],
      title: `Task: ${task.taskId} Deleted`,
      message: `Task has been deleted by ${task.createdBy}`,
      metadata: {
        taskId: task.taskId,
        title: task.title,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        dueDate: task.dueDate,
        responsibleTeam: task.responsibleTeam,
        assignedTo: task.assignedTo,
        managerTask: task.managerTask,
        managerId: task.managerId
      }
    };
  }

  public static async generateTaskDeadlineApproachingNotification(
    task: ITask,
    recipientId?: string
  ): Promise<Partial<INotification>> {
    const teamManager = (await this.teamRepository.getTeamById(task.responsibleTeam)).managerId;
    if (!teamManager) {
      throw new NotFoundError("Team manager not found");
    }

    return {
      type: NotificationType.TaskDelineApproaching,
      resourceType: NotificationResourceType.Task,
      resourceId: task.taskId,
      senderId: ["SYSTEM SMT"],
      recipientId: recipientId ? [recipientId] : [teamManager],
      title: `Task Deadline Approaching: ${task.taskId}`,
      message: `Task deadline is approaching for Task: ${task.taskId}`,
      metadata: {
        taskId: task.taskId,
        title: task.title,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        dueDate: task.dueDate,
        responsibleTeam: task.responsibleTeam,
        assignedTo: task.assignedTo,
        managerTask: task.managerTask,
        managerId: task.managerId
      }
    };
  }

  public static async generateTaskDeadlineOverdueNotification(
    task: ITask,
    recipientId?: string
  ): Promise<Partial<INotification>> {
    const teamManager = (await this.teamRepository.getTeamById(task.responsibleTeam)).managerId;
    if (!teamManager) {
      throw new NotFoundError("Team manager not found");
    }

    return {
      type: NotificationType.TaskDeadlineOverdue,
      resourceType: NotificationResourceType.Task,
      resourceId: task.taskId,
      senderId: ["SYSTEM SMT"],
      recipientId: recipientId ? [recipientId] : [teamManager],
      title: `Task Deadline Overdue: ${task.taskId}`,
      message: `Task deadline is overdue for Task: ${task.taskId}`,
      metadata: {
        taskId: task.taskId,
        title: task.title,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        dueDate: task.dueDate,
        responsibleTeam: task.responsibleTeam,
        assignedTo: task.assignedTo,
        managerTask: task.managerTask,
        managerId: task.managerId
      }
    };
  }
}
