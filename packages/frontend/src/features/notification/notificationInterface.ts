/* eslint-disable no-shadow */
export enum NotificationType {
  TaskUpdated = "TaskUpdated",
  TaskCompleted = "TaskCompleted",
  TaskReassigned = "TaskReassigned",
  TaskDeleted = "TaskDeleted",
  TaskCreated = "TaskCreated",
  TaskDeadlineApproaching = "TaskDeadlineApproaching",
  TaskStatusUpdated = "TaskStatusUpdated",
  TaskDueDateUpdated = "TaskDueDateUpdated",
  TaskAssignedToTeam = "TaskAssignedToTeam",
  TaskAssignedToUser = "TaskAssignedToUser",
  SubtaskCreated = "SubtaskCreated",
  SubtaskUpdated = "SubtaskUpdated",
  SubtaskCompleted = "SubtaskCompleted",
  SubtaskDeadlineApproaching = "SubtaskDeadlineApproaching",
  SubtaskDeadlineOverdue = "SubtaskDeadlineOverdue",
  SubtaskDeleted = "SubtaskDeleted",
  SubtaskStatusUpdated = "SubtaskStatusUpdated",
  SubtaskAssignedToTeamMember = "SubtaskAssignedToTeamMember",
}
export enum NotificationStatus {
  Unread = "Unread",
  Read = "Read",
}

export enum NotificationResourceType {
  Task = "Task",
  Subtask = "Subtask",
  User = "User",
}

export enum NotificationChannel {
  InApp = "InApp",
}

export interface INotification extends Document {
  notificationId: string;
  recipientId: string[];
  senderId?: string[];
  type: NotificationType;
  title: string;
  message: string;
  resourceType: NotificationResourceType;
  resourceId: string;
  status: NotificationStatus;
  channel?: NotificationChannel;
  metaData?: Record<string, unknown>;
  createdAt: Date;
  readAt?: Date;
  isRead: boolean;
}
