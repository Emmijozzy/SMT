import { ISubtask } from "features/subtask/subtask";
import { INotification, NotificationResourceType, NotificationType } from "./notification";

export default class generateSubtaskNotification {
  private static calculateTimeRemaining(dueDate: Date | undefined) {
    if (!dueDate) return { hoursRemaining: undefined, dayRemaining: undefined };

    const now = Date.now();
    const timeDiff = dueDate.getTime() - now;

    return {
      hoursRemaining: Math.ceil(timeDiff / (1000 * 60 * 60)).toString(),
      dayRemaining: Math.ceil(timeDiff / (1000 * 60 * 60 * 24)).toString(),
      overDueBy: timeDiff < 0 ? Math.abs(Math.ceil(timeDiff / (1000 * 60 * 60 * 24))) : undefined
    };
  }

  private static createBaseNotification(
    subtask: ISubtask,
    type: NotificationType,
    senderId: string[],
    title: string,
    message: string,
    recepientId: string[] | null = null
  ): Partial<INotification> {
    const { hoursRemaining, dayRemaining } = this.calculateTimeRemaining(subtask.dueDate);

    return {
      type,
      resourceType: NotificationResourceType.Subtask,
      resourceId: subtask.subtaskId,
      senderId,
      recipientId: recepientId && recepientId.length > 0 ? recepientId : [subtask.assignee],
      title,
      message,
      metadata: {
        subtaskId: subtask.subtaskId,
        taskId: subtask.taskId,
        assignee: subtask.assignee,
        status: subtask.status,
        hoursRemaining,
        remainingDays: dayRemaining
      }
    };
  }
  public static generateCreateSubtaskNotification(subtask: ISubtask): Partial<INotification> {
    return this.createBaseNotification(
      subtask,
      NotificationType.subtaskCreated,
      [subtask.createdBy],
      `New subtask: ${subtask.subtaskId} created and Assigned to you`,
      `You have been assigned a new subtask: ${subtask.subtaskId}`
    );
  }

  public static generateSubtaskReAssignedToTeamMemberNotification(
    subtask: ISubtask,
    requesterUserId: string
  ): Partial<INotification> {
    return this.createBaseNotification(
      subtask,
      NotificationType.SubtaskReAssignedToTeamMember,
      [requesterUserId],
      `Subtask: ${subtask.subtaskId} reassigned to you`,
      `You have been reassigned a new subtask: ${subtask.subtaskId}`
    );
  }

  public static generateSubtaskUpdatedNotification(subtask: ISubtask, requesterUserId: string): Partial<INotification> {
    return this.createBaseNotification(
      subtask,
      NotificationType.SubtaskUpdated,
      [requesterUserId],
      `Subtask: ${subtask.subtaskId} updated`,
      `Subtask: ${subtask.subtaskId} has been updated`
    );
  }

  public static generateSubtaskDeletedNotification(subtask: ISubtask, requesterUserId: string): Partial<INotification> {
    return this.createBaseNotification(
      subtask,
      NotificationType.SubtaskDeleted,
      [requesterUserId],
      `Subtask: ${subtask.subtaskId} deleted`,
      `Subtask: ${subtask.subtaskId} has been deleted`
    );
  }

  public static generateSubtaskStatusUpdatedNotification(
    subtask: ISubtask,
    requesterUserId: string,
    status: string,
    recepientId: string
  ): Partial<INotification> {
    return this.createBaseNotification(
      subtask,
      NotificationType.SubtaskStatusUpdated,
      [requesterUserId],
      `Subtask: ${subtask.subtaskId} status updated to ${status.replace("_", " ").toUpperCase()}`,
      `Subtask: ${subtask.subtaskId} status updated to ${status.replace("_", " ").toUpperCase()}`,
      [recepientId]
    );
  }

  public static generateSubtaskDeadlineApproachingNotification(subtask: ISubtask): Partial<INotification> {
    const { hoursRemaining, dayRemaining } = this.calculateTimeRemaining(subtask.dueDate);
    return this.createBaseNotification(
      subtask,
      NotificationType.subtaskDeadlineApproaching,
      ["system"],
      `Subtask: ${subtask.subtaskId} deadline approaching`,
      `Subtask: ${subtask.subtaskId} deadline approaching, ${hoursRemaining} hours remaining and ${dayRemaining} days left`,
      [subtask.assignee, subtask.createdBy]
    );
  }

  public static generateSubtaskOverdueNotification(subtask: ISubtask): Partial<INotification> {
    const { overDueBy } = this.calculateTimeRemaining(subtask.dueDate);
    return this.createBaseNotification(
      subtask,
      NotificationType.subtaskDeadlineOverdue,
      ["system"],
      `Subtask: ${subtask.subtaskId} overdue`,
      `Subtask: ${subtask.subtaskId} is overdue by ${overDueBy} days`,
      [subtask.assignee, subtask.createdBy]
    );
  }
}
