import mongoose, { Document, Schema } from "mongoose";
import cron = require("node-cron"); // Import Node.js cron for scheduling

// Task counter schema with strong typing
export interface ITaskCounter extends Document {
  date: Date;
  taskDate: string;
  counter: number;
}

const TaskCounterSchema = new Schema<ITaskCounter>({
  date: {
    type: Date,
    required: true
  },
  taskDate: {
    type: String,
    required: true
  },
  counter: {
    type: Number,
    default: 0
  }
});

export const taskCounter = mongoose.model<ITaskCounter>("TaskCounter", TaskCounterSchema);

// Schedule task to reset counter daily at midnight
const task = cron.schedule("* 0 * * *", async () => {
  try {
    await taskCounter.deleteMany({ date: { $lt: new Date() } });
    console.log("Task counter reset for new day");
  } catch (error) {
    console.error("Error resetting task counter:", error);
  }
});

task.start();
