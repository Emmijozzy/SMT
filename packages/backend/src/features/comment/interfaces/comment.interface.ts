export interface ICommentBase {
  commentId: string;
  comment: string;
  userId: string;
  subtaskId: string;
}

export interface ICommentTimestamps {
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentMetadata {
  del_flg: boolean;
}

export interface IComment extends Document, ICommentBase, ICommentTimestamps, ICommentMetadata {}
