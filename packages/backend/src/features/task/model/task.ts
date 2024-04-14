import mongoose, { Document, Model, Schema } from "mongoose";

export interface ITask extends Document {
  taskId: string; // Unique task identifier (automatically generated)
  title: string;
  description?: string;
  assignedTo: mongoose.Types.ObjectId[];
  responsibleTeam: string;
  status: "Not Started" | "In Progress" | "Completed" | "closed";
  managerTask: boolean;
  managerId: string;
  priority: "low" | "medium" | "high";
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  subTasks: mongoose.Types.ObjectId[];
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
      type: mongoose.Schema.Types.ObjectId,
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
    enum: ["Not Started", "In Progress", "Completed", "closed"],
    default: "Not Started"
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium"
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
  },
  subTasks: [
    {
      type: String,
      ref: "Subtask",
      path: "subTaskId"
    }
  ]
});

export const Task: Model<ITask> = mongoose.model<ITask>("Task", taskSchema);
