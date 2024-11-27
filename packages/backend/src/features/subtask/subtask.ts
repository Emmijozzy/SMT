import mongoose, { Document, Schema } from "mongoose";
import SubtaskCounter from "./subtaskCounter";

export interface ISubtask extends Document {
  subtaskId: string;
  taskId: string;
  title: string;
  team: string;
  description?: string;
  status?: "not started" | "completed" | "closed";
  priority: "low" | "medium" | "high";
  createdBy: string;
  lastModifiedBy: string;
  assignee: string;
  comments: string[];
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
    enum: ["not started", "completed", "closed"],
    required: true,
    default: "not Started"
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
