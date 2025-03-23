import { Document, model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export enum NotificationType {
  TaskUpdated = "TaskUpdated",
  TaskCompleted = "TaskCompleted",
  TaskReassigned = "TaskReassigned",
  TaskDeleted = "TaskDeleted",
  TaskCreated = "TaskCreated",
  TaskDelineApproaching = "TaskDelineApproaching",
  TaskDeadlineOverdue = "TaskDeadlineOverdue",
  TaskStatusUpdated = "TaskStatusUpdated",
  TaskDueDateUpdated = "TaskDueDateUpdated",
  TaskReassignedToTeam = "TaskReassignedToTeam",
  TaskAssignedToUser = "TaskAssignedToUser",
  subtaskCreated = "subtaskCreated",
  SubtaskUpdated = "SubtaskUpdated",
  SubtaskCompleted = "SubtaskCompleted",
  subtaskDeadlineApproaching = "SubtaskDeadlineApproaching",
  subtaskDeadlineOverdue = "SubtaskDeadlineOverdue",
  SubtaskDeleted = "SubtaskDeleted",
  SubtaskStatusUpdated = "SubtaskStatusUpdated",
  SubtaskReAssignedToTeamMember = "SubtaskAssignedToTeamMember"
}

export enum NotificationStatus {
  Unread = "Unread",
  Read = "Read"
}

export enum NotificationResourceType {
  Task = "Task",
  Subtask = "Subtask",
  User = "User"
}

export enum NotificationChannel {
  InApp = "InApp",
  Email = "Email",
  SMS = "SMS"
}

export type NotificationMetadata = {
  subtaskId?: string;
  taskId?: string;
  hoursRemaining?: string;
  status?: string;
  assignee?: string;
  remainingDays?: string;
};

export interface INotification extends Document {
  notificationId?: string;
  recipientId: string[];
  senderId?: string[];
  type: NotificationType;
  title: string;
  message: string;
  resourceType: NotificationResourceType;
  resourceId: string;
  status?: NotificationStatus;
  channel?: NotificationChannel;
  metadata?: Record<string, unknown> | NotificationMetadata;
  createdAt: Date;
  readAt?: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    notificationId: { type: String, required: true, unique: true, default: uuidv4 },
    recipientId: { type: [String], required: true },
    senderId: { type: [String] },
    type: { type: String, enum: Object.values(NotificationType), required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    resourceType: { type: String, enum: Object.values(NotificationResourceType), required: true },
    resourceId: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(NotificationStatus),
      default: NotificationStatus.Unread
    },
    channel: { type: String, enum: Object.values(NotificationChannel), default: NotificationChannel.InApp },
    metadata: { type: Object, required: false },
    createdAt: { type: Date, default: Date.now },
    readAt: { type: Date, required: false }
  },
  { timestamps: true }
);

export default model<INotification>("Notification", notificationSchema);
