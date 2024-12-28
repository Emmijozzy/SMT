import { memo } from "react";
import { CommentType } from "./commentInterface";
import SingleComment from "./component/SingleCommentProps";

interface CommentProps {
  comments: CommentType[];
  onReply: (commentId: string) => void;
  onEdit: (commentId: string) => void;
  onDelete: (commentId: string) => void;
}

const Comment = memo(({ comments, onReply, onEdit, onDelete }: CommentProps) => {
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
          onReply={onReply}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
});

Comment.displayName = "Comment";

export default Comment;
