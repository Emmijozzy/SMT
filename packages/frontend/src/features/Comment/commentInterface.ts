export interface CommentType {
  _id?: string;
  commentId?: string;
  userId: string;
  subtaskId: string;
  comment: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type CommentData = { comment: string; userId: string; subtaskId: string };
