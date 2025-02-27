import { Document, model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export enum NotificationType {
  TaskUpdated = "TaskUpdated",
  TaskCompleted = "TaskCompleted",
  TaskReassigned = "TaskReassigned",
  TaskDeleted = "TaskDeleted",
  TaskCreated = "TaskCreated",
  TaskDelineApproaching = "TaskDelineApproaching",
  TaskStatusUpdated = "TaskStatusUpdated",
  TaskDueDateUpdated = "TaskDueDateUpdated",
  TaskAssignedToTeam = "TaskAssignedToTeam",
  TaskAssignedToUser = "TaskAssignedToUser",
  subtaskCreated = "subtaskCreated",
  SubtaskUpdated = "SubtaskUpdated",
  SubtaskCompleted = "SubtaskCompleted",
  subtaskDeadlineApproaching = "SubtaskDeadlineApproaching",
  subtaskDeadlineOverdue = "SubtaskDeadlineOverdue",
  SubtaskDeleted = "SubtaskDeleted",
  SubtaskStatusUpdated = "SubtaskStatusUpdated",
  SubtaskAssignedToTeamMember = "SubtaskAssignedToTeamMember"
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
  InApp = "InApp"
}

export interface INotification extends Document {
  notificationId?: string;
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
    status: { type: String, enum: Object.values(NotificationStatus), required: true },
    channel: { type: String, enum: Object.values(NotificationChannel) },
    metaData: { type: Object, required: false },
    createdAt: { type: Date, default: Date.now },
    readAt: { type: Date, required: false }
  },
  { timestamps: true }
);

// notificationSchema.pre<INotification>("save", async function (next) {
//   // console.log("Inside pre('save') hook!");

//   try {
//     if (!this.notificationId) {
//       this.notificationId = uuidv4();
//     }
//     next();
//   } catch (err: unknown) {
//     const error = err as Error;
//     next(new Error("Error generating team ID: " + error.message));
//   }
// });

export default model<INotification>("Notification", notificationSchema);
