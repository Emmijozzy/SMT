import { InternalError } from "../../utils/ApiError";
import { CommentRepository } from "./commentRepository";
import { IComment } from "./interfaces/comment.interface";

export default class CommentService {
  private commentRepository: CommentRepository;
  constructor() {
    this.commentRepository = new CommentRepository();
  }

  async create(commentData: Partial<IComment>, requesterUserId: string): Promise<IComment> {
    try {
      const payload = {
        ...commentData,
        userId: requesterUserId
      };
      const comment = await this.commentRepository.create(payload);
      if (!comment) throw new InternalError("Failed to create comment");
      return comment;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to create comment ERR:" + error.message, "", __filename);
    }
  }

  async getComments(filter: Record<string, unknown>): Promise<IComment[]> {
    try {
      const comments = await this.commentRepository.getComments(filter);
      if (!comments) throw new InternalError("Failed to fetch comments");
      return comments.map((comment) => ({
        ...comment,
        _id: comment._id.toString()
      })) as IComment[];
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to fetch comments ERR:" + error.message, "", __filename);
    }
  }

  async getCommentById(commentId: string): Promise<IComment | null> {
    try {
      const comment = await this.commentRepository.getCommentById(commentId);
      if (!comment) throw new InternalError("Failed to fetch comment");
      return {
        ...comment,
        _id: comment._id.toString()
      } as IComment;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to fetch comment ERR:" + error.message, "", __filename);
    }
  }

  async getCommentBySubtaskId(subtaskId: string): Promise<IComment[] | null> {
    try {
      if (!subtaskId) throw new InternalError("Subtask ID is required");
      const comments = await this.commentRepository.getCommentBySubtaskId(subtaskId);
      if (!comments) throw new InternalError("Failed to fetch comment");
      return comments.map((comment) => ({
        ...comment,
        _id: comment._id.toString()
      })) as IComment[];
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to fetch comment ERR:" + error.message, "", __filename);
    }
  }

  async updateCommentById(commentId: string, commentData: Partial<IComment>): Promise<IComment | null> {
    try {
      const comment = await this.commentRepository.updateCommentById(commentId, commentData);
      if (!comment) throw new InternalError("Failed to update comment");
      return {
        ...comment,
        _id: comment._id.toString()
      } as IComment;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to update comment ERR:" + error.message, "", __filename);
    }
  }

  async deleteCommentById(commentId: string): Promise<IComment | null> {
    try {
      const comment = await this.commentRepository.deleteCommentById(commentId);
      if (!comment) throw new InternalError("Failed to delete comment");
      return {
        ...comment,
        _id: comment._id.toString()
      } as IComment;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to delete comment ERR:" + error.message, "", __filename);
    }
  }
  async deleteCommentBySubtaskId(subtaskId: string): Promise<boolean> {
    try {
      const comment = await this.commentRepository.deleteCommentBySubtaskId(subtaskId);
      if (!comment) throw new InternalError("Failed to delete comment");
      return comment;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to delete comment ERR:" + error.message, "", __filename);
    }
  }
}
