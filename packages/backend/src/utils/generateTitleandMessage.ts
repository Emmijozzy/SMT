/* eslint-disable indent */
import { NotificationType } from "../features/notification/notification";

export const generateTitleandMessage = (
  type: NotificationType,
  metaData: Record<string, string>
): { title: string; message: string } => {
  let title = "";
  let message = "";
  switch (type) {
    case NotificationType.subtaskDeadlineApproaching:
      title = "Subtask Deadline Approaching";
      message = `The subtask with ID: "${metaData?.subtaskId}" is due in ${metaData?.hoursRemaining} hours.`;
      break;
    case NotificationType.subtaskDeadlineOverdue:
      title = "Subtask Deadline Overdue";
      message = `The subtask with ID: "${metaData?.subtaskId}" is overdue.`;
      break;
    case NotificationType.subtaskCreated:
      title = "Subtask Created and Assigned";
      message = `The subtask with ID: "${metaData?.subtaskId}" has been created and assigned to you.`;
      break;
    case NotificationType.SubtaskUpdated:
      title = "Subtask Updated";
      message = `The subtask with ID: "${metaData?.subtaskId}" has been updated.`;
      break;
    case NotificationType.SubtaskCompleted:
      title = "Subtask Completed";
      message = `The subtask with ID: "${metaData?.subtaskId}" has been approved.`;
      break;
    case NotificationType.SubtaskDeleted:
      title = "Subtask Deleted";
      message = `The subtask with ID: "${metaData?.subtaskId}" has been deleted.`;
      break;
    case NotificationType.SubtaskStatusUpdated:
      title = `Subtask Status Updated to ${metaData?.status.replace("_", " ")}`;
      message = `The subtask with ID: "${metaData?.subtaskId}" has been updated to ${metaData?.status.replace("_", " ")}.`;
      break;
    case NotificationType.SubtaskReAssignedToTeamMember:
      title = "Subtask Assigned to Team Member";
      message = `The subtask with ID: "${metaData?.subtaskId}" has been assigned to ${metaData?.assignee}.`;
      break;
    case NotificationType.TaskCreated:
      title = "Task Created and Assigned to Team";
      message = `The task with ID: "${metaData?.taskId}" has been created and assigned to your team.`;
      break;
    case NotificationType.TaskUpdated:
      title = "Task Updated";
      message = `The task with ID: "${metaData?.taskId}" has been updated.`;
      break;
    case NotificationType.TaskCompleted:
      title = "Task Completed";
      message = `The task with ID: "${metaData?.taskId}" has been approved.`;
      break;
    case NotificationType.TaskDeleted:
      title = "Task Deleted";
      message = `The task with ID: "${metaData?.taskId}" has been deleted.`;
      break;
    case NotificationType.TaskStatusUpdated:
      title = `Task Status Updated to ${metaData?.status.replace("_", " ")}`;
      message = `The task with ID: "${metaData?.taskId}" has been updated to ${metaData?.status.replace("_", " ")}.`;
      break;
    case NotificationType.TaskReassignedToTeam:
      title = "Task Reassigned to Team";
      message = `The task with ID: "${metaData?.taskId}" has been reassigned to your team.`;
      break;
    case NotificationType.TaskDelineApproaching:
      title = "Task Deline Approaching";
      message = `The task with ID: "${metaData?.taskId}" is due in ${metaData?.remainingDays} days.`;
      break;
    case NotificationType.TaskDueDateUpdated:
      title = "Task Due Date Updated";
      message = `The due date for the task with ID: "${metaData?.taskId}" has been updated.`;
      break;
    case NotificationType.TaskDeadlineOverdue:
      title = "Task Deadline Overdue";
      message = `The task with ID: "${metaData?.taskId}" is overdue.`;
      break;
    default:
      throw new Error(`Notification type ${type} is not supported`);
  }
  return { title, message };
};
