/* eslint-disable react/no-danger */
import { memo, useState } from "react";
import EditEditor from "../../../shared/components/Editor/EditEditor";
import User from "../../../shared/components/User";
import formatDateTime from "../../../shared/utils/formatDateTime";
import { CommentType } from "../commentInterface";
import DeleteCommentModal from "./DeleteCommentModal";

interface SingleCommentProps {
  comment: CommentType;
  onReply: (commentId: string) => void;
  onEdit: (commentId: string) => void;
  onDelete: (commentId: string) => void;
}

const SingleComment = memo(({ comment, onReply, onEdit, onDelete }: SingleCommentProps) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const handleReply = () => onReply?.(comment.commentId);

  const handleEdit = () => onEdit?.(comment.commentId);
  const handleDelete = () => onDelete?.(comment.commentId);
  const handleShowEdit = () => {
    setShowEdit(!showEdit);
  };

  const updateComment = (content: string) => {
    console.log(content);
  };

  return (
    <div className="comment flex flex-col items-start p-4 hover:bg-base-200/50 transition-colors w-full">
      {showEdit ? (
        <div className="w-full">
          <EditEditor content={comment.comment} onChange={updateComment} />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 w-full">
            <User userId={comment.userId} index={0} />
            <span className="font-bold">John Doe</span>
            <span className="text-base-content/50 text-xs ml-auto">{formatDateTime(comment.createdAt)}</span>
          </div>
          <div className="flex items-center ml-8 mt-1">
            <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: comment.comment }} />
          </div>
        </>
      )}

      <div className="flex gap-4 ml-8 mt-2">
        {/* <button type="button" onClick={handleReply} className="btn btn-ghost btn-xs">
          Reply
        </button> */}
        <button type="button" onClick={handleShowEdit} className="btn btn-ghost btn-xs">
          Edit
        </button>
        <button type="button" onClick={() => setShowDeleteModal(true)} className="btn btn-ghost btn-xs text-error">
          Delete
        </button>
      </div>

      {showDeleteModal && <DeleteCommentModal onClose={() => setShowDeleteModal(false)} onDelete={handleDelete} />}
    </div>
  );
});
SingleComment.displayName = "SingleComment";
export default SingleComment;
