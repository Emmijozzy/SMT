import { Model, model, Schema } from "mongoose";
import generateShortId from "../../utils/generateShortId";
import { IComment } from "./interfaces/comment.interface";

const commentSchemaFields = {
  commentId: { type: String, unique: true },
  userId: { type: String, ref: "User", path: "userId" },
  subtaskId: { type: String, ref: "Task", path: "subtaskId" },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  del_flg: { type: Boolean, default: false }
};

const commentSchema = new Schema<IComment>(commentSchemaFields);

commentSchema.pre<IComment>("save", function (next) {
  this.commentId = generateShortId();
  next();
});

export const Comment: Model<IComment> = model<IComment>("Comment", commentSchema);
