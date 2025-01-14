import SubtaskService from "../../features/subtask/subtaskService";
import { BadRequestError, InternalError } from "../../utils/ApiError";
import CommentService from "./commentService";
import { IComment } from "./interfaces/comment.interface";

export default class CommentOrchestrator {
  private commentService: CommentService;
  private subtaskService: SubtaskService;

  constructor() {
    this.commentService = new CommentService();
    this.subtaskService = new SubtaskService();
  }

  async createComment(requesterUserId: string, commentData?: Partial<IComment>): Promise<IComment> {
    try {
      if (!commentData) throw new BadRequestError("Comment data is required");
      const { subtaskId } = commentData;
      if (!subtaskId) throw new BadRequestError("Subtask ID is required");
      const subtask = await this.subtaskService.getSubtaskById(subtaskId);
      if (!subtask) throw new BadRequestError("Subtask not found");
      if (!requesterUserId) throw new BadRequestError("User ID is required");
      const comment = await this.commentService.create(commentData, requesterUserId);
      await this.subtaskService.addCommentId(subtask.subtaskId, comment.commentId);
      return comment;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error creating comment", error);
      throw new InternalError("Failed to create comment.  ERROR: " + error.message + " ", error.stack, __filename);
    }
  }

  async updateComment(commentData: Partial<IComment>): Promise<IComment> {
    try {
      const { commentId } = commentData;
      if (!commentId) throw new BadRequestError("Comment ID is required");
      const comment = await this.commentService.getCommentById(commentId);
      if (!comment) throw new BadRequestError("Comment not found");
      const currentTime = new Date();
      const createdTime = new Date(comment.createdAt);
      if (currentTime.getTime() - createdTime.getTime() > 1000 * 60 * 5) {
        throw new BadRequestError("Comment cannot be updated after 5 minutes");
      }
      const payload = {
        ...comment,
        comment: commentData.comment || comment.comment,
        updatedAt: new Date()
      };
      const updatedComment = await this.commentService.updateCommentById(commentId, payload);
      if (!updatedComment) throw new BadRequestError("Failed to update comment");
      return updatedComment;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error updating comment", error);
      throw error;
    }
  }

  async deleteComment(commentId: string): Promise<void> {
    try {
      if (!commentId) throw new BadRequestError("Comment ID is required");
      const comment = await this.commentService.getCommentById(commentId);
      if (!comment) throw new BadRequestError("Comment not found");
      const currentTime = new Date();
      const createdTime = new Date(comment.createdAt);
      if (currentTime.getTime() - createdTime.getTime() > 1000 * 60 * 5) {
        throw new BadRequestError("Comment cannot be deleted after 5 minutes");
      }
      await this.subtaskService.removeCommentId(comment.subtaskId, commentId);
      await this.commentService.deleteCommentById(commentId);
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error deleting comment", error);
      throw new InternalError("Failed to delete comment.  ERROR: " + error.message + " ", error.stack, __filename);
    }
  }
}
