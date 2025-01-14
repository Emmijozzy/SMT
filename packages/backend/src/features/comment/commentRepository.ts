import { BadRequestError, InternalError } from "../../utils/ApiError";
import { Comment } from "./comment";
import { IComment } from "./interfaces/comment.interface";

export class CommentRepository {
  public async create(commentData: Partial<IComment>) {
    try {
      const newComment = new Comment(commentData);
      const comment = await newComment.save();
      return comment;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error creating comments", error);

      if (error.name === "Validation") {
        throw new BadRequestError("Invalid comment data provided");
      } else {
        throw new InternalError("Failed to create team.  ERROR: " + error.message + " ", error.stack, __filename);
      }
    }
  }

  public async getComments(filter: Record<string, unknown>) {
    try {
      const comments = await Comment.find(filter).lean().exec();
      return comments;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error fetching comments", error);
      throw new InternalError("Failed to fetch comments.  ERROR: " + error.message + " ", error.stack, __filename);
    }
  }

  public async getCommentById(commentId: string) {
    try {
      const comment = await Comment.findOne({ commentId }).lean().exec();
      if (!comment) throw new Error(`Comment ${commentId} not found`);
      return comment;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error fetching comment by id", error);
      throw new InternalError("Failed to fetch comment by id.  ERROR: " + error.message + " ", error.stack, __filename);
    }
  }
  public async getCommentBySubtaskId(subtaskId: string) {
    try {
      const comment = await Comment.find({ subtaskId }).lean().exec();
      if (!comment) throw new Error(`Comment ${subtaskId} not found`);
      return comment;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error fetching comment by subtaskId", error);
      throw new InternalError(
        "Failed to fetch comment by subtaskId.  ERROR: " + error.message + " ",
        error.stack,
        __filename
      );
    }
  }
  public async updateCommentById(commentId: string, commentData: Partial<IComment>) {
    try {
      const comment = await Comment.findOneAndUpdate({ commentId }, commentData, { new: true }).lean().exec();
      if (!comment) throw new Error(`Comment ${commentId} not found`);
      return comment;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error updating comment by id", error);
      throw new InternalError(
        "Failed to update comment by id.  ERROR: " + error.message + " ",
        error.stack,
        __filename
      );
    }
  }
  public async deleteCommentById(commentId: string) {
    try {
      const comment = await Comment.findOneAndDelete({ commentId }).lean().exec();
      if (!comment) throw new Error(`Comment ${commentId} not found`);
      return comment;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error deleting comment by id", error);
      throw new InternalError(
        "Failed to delete comment by id.  ERROR: " + error.message + " ",
        error.stack,
        __filename
      );
    }
  }
  public async deleteCommentBySubtaskId(subtaskId: string) {
    try {
      await Comment.deleteMany({ subtaskId }).exec();
      return true;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error deleting comments by subtask id", error);
      throw new InternalError(
        "Failed to delete comments by subtask id.  ERROR: " + error.message + " ",
        error.stack,
        __filename
      );
    }
  }
}
