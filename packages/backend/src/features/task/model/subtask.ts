import mongoose, { Document, Schema } from "mongoose";
import { ITask, Task } from "./task";

interface ISubtask extends Document {
  subtaskId: string;
  taskId: string;
  title: string;
  description?: string;
  status?: "not started" | "in progress" | "completed" | "closed";
  createdBy: string;
  lastModifiedBy: string;
  assignedTo: string;
  collaborators: string[];
  createdAt: Date;
  updatedAt: Date;
}

const subtaskSchema = new Schema<ISubtask>({
  subtaskId: {
    type: String,
    required: true,
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
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed", "closed"],
    required: true
  },
  createdBy: {
    type: String,
    required: true,
    ref: "User",
    path: "userId"
  },
  lastModifiedBy: {
    type: String,
    required: true,
    ref: "User",
    path: "userId"
  },
  assignedTo: {
    type: String,
    ref: "User",
    path: "userId",
    required: true
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
  if (!this.taskId) {
    throw new Error("Invalid Task id for sub task");
  }

  // Generate subtask ID logic
  const taskIdBase = this.taskId.toString(); // Use the generated task ID (assumed as string)

  let subtaskCounter = 1;
  const existingSubtask = await SubtaskModel.findOne({
    taskId: this.taskId,
    subtaskId: { $regex: `^${taskIdBase}[0-9]{2}$` }, // Match format with zero-padding
    sort: { subtaskId: -1 } // Get the latest subtask
  });

  if (existingSubtask) {
    subtaskCounter = parseInt(existingSubtask.subtaskId.slice(-2)) + 1; // Get last two digits
  }

  this.subtaskId = `${taskIdBase}${subtaskCounter.toString().padStart(3, "0")}`;
  next();
});

subtaskSchema.post<ISubtask>("save", async function () {
  const task = await Task.findOne<ITask>({ taskId: this.taskId.toString() });
  if (task) {
    task.assignedTo.push(this.assignedTo);
    task.subtasks.push(this.subtaskId); // Use 'new' to create ObjectId
    await task.save();
  }
});

export const SubtaskModel = mongoose.model<ISubtask>("Subtask", subtaskSchema);
