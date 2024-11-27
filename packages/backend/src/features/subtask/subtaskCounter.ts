import mongoose, { Document, Schema } from "mongoose";

// Task counter schema with strong typing
export interface ISubtaskCounter extends Document {
  date: Date;
  taskId: string;
  counter: number;
}

const SubtaskCounterSchema = new Schema<ISubtaskCounter>({
  date: {
    type: Date,
    default: Date.now
  },
  taskId: {
    type: String,
    required: true
  },
  counter: {
    type: Number,
    default: 0
  }
});

const subtaskCounter = mongoose.model<ISubtaskCounter>("SubtaskCounter", SubtaskCounterSchema);

export default subtaskCounter;
