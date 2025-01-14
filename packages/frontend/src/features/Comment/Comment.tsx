/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from "react";
import { CommentData, CommentType } from "./commentInterface";
import SingleComment from "./component/SingleComment";

interface CommentProps {
  comments: CommentType[];
  onEdit: (commentData: CommentData) => Promise<void>;
  isEditing: boolean;
  onDelete: (commentId: string) => Promise<void>;
  isDeleting: boolean;
}

const Comment = memo(({ comments, onEdit, isEditing, onDelete, isDeleting }: CommentProps) => {
  if (!comments?.length) {
    return (
      <div className="mt-4 bg-base-100 rounded-lg p-4">
        <p className="text-center text-base-content/50">No comments yet</p>
      </div>
    );
  }

  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="mt-4 bg-base-100 rounded-lg shadow-sm divide-y">
      {sortedComments.map((comment) => (
        <SingleComment
          key={comment.commentId}
          comment={comment}
          onEdit={onEdit}
          isEditing={isEditing}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
});

Comment.displayName = "Comment";

export default Comment;
