import mongoose, { Document, Schema } from "mongoose";

export type CheckList = {
  id: string;
  checkItem: string;
  isChecked: boolean;
  isApprove: boolean;
  isReject: boolean;
};

export type RequiredField = {
  id: string;
  field: string;
  input: string;
  type: "text" | "link";
};

export interface ISubtaskAuditLog extends Document {
  id: string;
  subtaskId: string;
  timestamp: Date;
  action: string;
  actor: {
    userId: string;
    name: string;
    role: string;
  };
  details?: {
    requiredFields?: RequiredField[];
    checklist?: CheckList[];
    feedback?: string;
    comment?: string;
    decision?: string;
  };
}

const subtaskAuditLogSchema = new Schema<ISubtaskAuditLog>({
  id: { type: String, required: true },
  subtaskId: {
    type: String, // Use Schema.Types.ObjectId here
    ref: "Subtask",
    path: "subtaskId",
    required: true
  },
  timestamp: { type: Date, required: true, default: Date.now },
  action: { type: String, required: true },
  actor: {
    userId: {
      type: String,
      required: true,
      ref: "User",
      path: "userId"
    },
    name: { type: String, required: true },
    role: { type: String, required: true }
  },
  details: {
    requiredFields: {
      type: [
        {
          id: { type: String, required: true },
          field: { type: String, required: true },
          input: { type: String },
          type: { type: String, enum: ["text", "link"], required: true }
        }
      ],
      default: []
    },
    checklist: {
      type: [
        {
          id: { type: String, required: true },
          checkItem: { type: String, required: true },
          isChecked: { type: Boolean, required: true },
          isApprove: { type: Boolean, required: true },
          isReject: { type: Boolean, required: true }
        }
      ],
      default: []
    },
    feedback: { type: String },
    comment: { type: String },
    decision: { type: String }
  }
});

export default mongoose.model<ISubtaskAuditLog>("SubtaskAuditLog", subtaskAuditLogSchema);
