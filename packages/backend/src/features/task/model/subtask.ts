import mongoose, { Document, Schema } from "mongoose";
import { Task, ITask } from "./task";

interface ISubtask extends Document {
  subTaskId: string;
  taskId: string;
  title: string;
  description?: string;
  status: "In Progress" | "Completed" | "Deferred" | "Cancelled";
  createdBy: mongoose.Types.ObjectId;
  lastModifiedBy: mongoose.Types.ObjectId;
  assignedTo: mongoose.Types.ObjectId;
  collaborators: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const subtaskSchema = new Schema<ISubtask>({
  subTaskId: {
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
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  collaborators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

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
    subtaskCounter = parseInt(existingSubtask.subTaskId.slice(-2)) + 1; // Get last two digits
  }

  this.subTaskId = `${taskIdBase}${subtaskCounter.toString().padStart(2, "0")}`;
  next();
});

subtaskSchema.post<ISubtask>("save", async function () {
  const task = await Task.findOne<ITask>({ taskId: this.taskId.toString() });
  if (task) {
    task.assignedTo.push(this.assignedTo);
    task.subTasks.push(new mongoose.Types.ObjectId(this.subTaskId)); // Use 'new' to create ObjectId
    await task.save();
  }
});

export const SubtaskModel = mongoose.model<ISubtask>("Subtask", subtaskSchema);
