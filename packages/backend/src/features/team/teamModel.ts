import mongoose, { Document, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface ITeam extends Document {
  teamId?: string; // Unique team identifier (automatically generated)
  name: string;
  description: string;
  members?: string[]; // Array of ObjectIds referencing User documents
  managerId?: string; // Array of ObjectIds referencing Project documents (optional)
  tasks?: string[];
  subtasks?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const teamSchema = new Schema<ITeam>({
  teamId: {
    type: String,
    unique: true // Ensure unique team IDs
  },
  name: {
    type: String,
    required: true,
    maxLength: 255,
    unique: true
  },
  description: {
    type: String
  },
  members: [
    {
      type: String,
      ref: "User",
      path: "userId"
    }
  ],
  tasks: [
    {
      type: String,
      ref: "Task", // Reference to your Task model
      path: "taskId" // Path to the task ID in the Task model
    }
  ],
  subtasks: [
    {
      type: String,
      ref: "Subtask",
      path: "subTaskId"
    }
  ],
  managerId: {
    type: String,
    ref: "User",
    path: "userId",
    required: true
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

// teamSchema.set("_id", false);

teamSchema.pre<ITeam>("save", async function (next) {
  // console.log("Inside pre('save') hook!");

  try {
    if (!this.teamId) {
      this.teamId = uuidv4().substring(0, 8);
    }
    next();
  } catch (err: unknown) {
    const error = err as Error;
    next(new Error("Error generating team ID: " + error.message));
  }
});

export default mongoose.model<ITeam>("Team", teamSchema);
