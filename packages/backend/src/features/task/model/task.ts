import mongoose, { Document, Model, Schema } from "mongoose";

export interface ITask extends Document {
  taskId: string; // Unique task identifier (automatically generated)
  title: string;
  description?: string;
  assignedTo: string[];
  responsibleTeam: string;
  status: "not started" | "in progress" | "completed" | "closed";
  managerTask: boolean;
  managerId: string;
  priority: "low" | "medium" | "high";
  progress?: number;
  createdBy: string;
  modifiedBy?: string;
  dueDate: Date;
  startDate: Date;
  createdAt: Date;
  updatedAt: Date;
  del_flg: boolean;
  subtasks: string[];
}

// Define a type guard function
function isManagerTask(doc: ITask): doc is ITask & { managerTask: true } {
  return doc.managerTask === true;
}

const taskSchema = new Schema<ITask>({
  taskId: {
    type: String,
    required: true,
    unique: true // Ensure unique task IDs
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  assignedTo: [
    {
      type: String,
      ref: "User",
      path: "userId"
    }
  ],
  responsibleTeam: {
    type: String,
    ref: "Team",
    path: "teamId"
  },
  managerTask: {
    type: Boolean,
    default: false
  },
  managerId: {
    type: String,
    // Use a type guard function for conditional required with custom message
    required: function (this: ITask) {
      if (!isManagerTask(this)) {
        return false;
      }
      return true; // No explicit message needed if managerTask is true
    }
  },
  status: {
    type: String,
    enum: ["not started", "in progress", "completed", "closed"],
    default: "not started"
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium"
  },
  progress: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: String,
    ref: "User",
    path: "userId",
    required: true
  },
  modifiedBy: {
    type: String,
    ref: "User",
    path: "userId"
  },
  dueDate: {
    type: Date
  },
  startDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  del_flg: {
    type: Boolean,
    default: false
  },
  subtasks: {
    type: [
      {
        type: String,
        ref: "Subtask",
        path: "subtaskId"
      }
    ],
    default: []
  }
});

export const Task: Model<ITask> = mongoose.model<ITask>("Task", taskSchema);
