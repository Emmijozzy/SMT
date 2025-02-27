import mongoose, { Document, Schema } from "mongoose";
import SubtaskCounter from "./subtaskCounter";

const checkListSchema = new Schema({
  id: { type: String, required: true },
  checkItem: { type: String, required: true },
  isChecked: { type: Boolean, required: true },
  isApprove: { type: Boolean, required: true },
  isReject: { type: Boolean, required: true }
});

// Define the schema for the requiredFields array
const requiredFieldSchema = new Schema({
  id: { type: String, required: true },
  field: { type: String, required: true },
  input: { type: String },
  type: { type: String, enum: ["text", "link"], required: true }
});

export interface ISubtask extends Document {
  subtaskId: string;
  taskId: string;
  title: string;
  team: string;
  description?: string;
  status?: "open" | "in_process" | "in_review" | "revisit" | "completed";
  priority: "low" | "medium" | "high";
  createdBy: string;
  lastModifiedBy: string;
  assignee: string;
  comments: string[];
  checkLists: {
    id: string;
    checkItem: string;
    isChecked: boolean;
    isApprove: boolean;
    isReject: boolean;
  }[];
  requiredFields: {
    id: string;
    field: string;
    input: string;
    type: "text" | "link";
  }[];
  overdueNotificationSent: boolean;
  deadlineNotificationSent: boolean;
  feedback: string;
  comment: string;
  collaborators: string[];
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const subtaskSchema = new Schema<ISubtask>({
  subtaskId: {
    type: String,
    // required: true,
    unique: true
  },
  taskId: {
    type: String, // Use Schema.Types.ObjectId here
    ref: "Task",
    path: "taskId",
    required: true
  },
  title: {
    type: String,
    required: true,
    maxLength: 255
  },
  team: {
    type: String,
    required: true,
    ref: "Team",
    path: "teamId"
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ["open", "in_process", "in_review", "revisit", "completed"],
    required: true,
    default: "open"
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium"
  },
  createdBy: {
    type: String,
    required: true,
    ref: "User",
    path: "userId"
  },
  lastModifiedBy: {
    type: String,
    ref: "User",
    path: "userId"
  },
  assignee: {
    type: String,
    ref: "User",
    path: "userId",
    required: true
  },
  comments: {
    type: [
      {
        type: String,
        ref: "Comment",
        path: "commentId"
      }
    ],
    default: []
  },
  feedback: {
    type: String
  },
  comment: {
    type: String
  },
  collaborators: {
    type: [
      {
        type: String,
        ref: "User",
        path: "userId"
      }
    ],
    default: []
  },
  checkLists: { type: [checkListSchema], default: [] },
  requiredFields: { type: [requiredFieldSchema], default: [] },
  overdueNotificationSent: {
    type: Boolean,
    default: false
  },
  deadlineNotificationSent: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// checking if the subtask has a task Id
subtaskSchema.pre<ISubtask>("save", async function (next) {
  try {
    if (!this.taskId) {
      throw new Error("Invalid Task id for sub task");
    }

    // Generate subtask ID logic
    const taskIdBase = this.taskId.toString(); // Use the generated task ID (assumed as string)

    let counter = await SubtaskCounter.findOne({ taskId: taskIdBase });
    if (!counter) {
      counter = new SubtaskCounter({ counter: 1, taskId: taskIdBase });
      await counter.save();
    }

    counter.counter++;

    this.subtaskId = `${taskIdBase}${counter.counter.toString().padStart(3, "0")}`;
    await counter.save();
    next();
  } catch (e) {
    throw new Error(`Error generating subtaskId:${e}`);
  }
});

// subtaskSchema.post<ISubtask>("save", async function () {
//   const task = await Task.findOne<ITask>({ taskId: this.taskId.toString() });
//   if (task) {
//     task.assignedTo.push(this.assignee);
//     task.subtasks.push(this.subtaskId); // Use 'new' to create ObjectId
//     await task.save();
//   }
// });

const SubtaskModel = mongoose.model<ISubtask>("Subtask", subtaskSchema);

export default SubtaskModel;
