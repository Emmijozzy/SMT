/* eslint-disable react/no-danger */
import { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import EditEditor from "../../../shared/components/Editor/EditEditor";
import { getPresentUser } from "../../profile/userProfileSlice";
import { useGetUserQuery } from "../../users/userApiSlice";
import { CommentData, CommentType } from "../commentInterface";
import { useCommentState } from "../hooks/useCommentState";
import { CommentActions } from "./CommentActions";
import { CommentContent } from "./CommentContent";
import DeleteCommentModal from "./DeleteCommentModal";

interface SingleCommentProps {
  comment: CommentType;
  onEdit: (commentData: CommentData) => Promise<void>;
  isEditing: boolean;
  onDelete: (commentId: string) => Promise<void>;
  isDeleting: boolean;
}

const SingleComment = memo(({ comment, onEdit, isEditing, onDelete, isDeleting }: SingleCommentProps) => {
  const { showEdit, setShowEdit, showDeleteModal, setShowDeleteModal, editedComment, setEditedComment } =
    useCommentState(comment.comment);

  const { data: User, isFetching, isSuccess } = useGetUserQuery(comment.userId);

  const { userId } = useSelector((state: RootState) => getPresentUser(state));
  const isOwnComment = userId === comment.userId;

  const handleEdit = () => {
    const payload: CommentType = {
      ...comment,
      comment: editedComment,
    };
    onEdit(payload).finally(() => setShowEdit(false));
  };

  const handleDelete = () => {
    onDelete(comment.commentId || "").finally(() => setShowDeleteModal(false));
  };

  return (
    <div className="comment flex flex-col items-start p-4 hover:bg-base-200/50 transition-colors w-full">
      {showEdit && isOwnComment ? (
        <EditEditor
          content={editedComment}
          onChange={setEditedComment}
          handleEditComment={handleEdit}
          isEditing={isEditing}
        />
      ) : (
        <CommentContent
          commentUser={User || null}
          userIsLoading={isFetching && !isSuccess}
          comment={comment}
          createdAt={new Date(comment.createdAt).toUTCString()}
        />
      )}

      {isOwnComment && (
        <CommentActions
          onShowEdit={() => setShowEdit(!showEdit)}
          onShowDelete={() => setShowDeleteModal(true)}
          showEdit={showEdit}
        />
      )}

      {showDeleteModal && (
        <DeleteCommentModal onClose={() => setShowDeleteModal(false)} onDelete={handleDelete} isDeleting={isDeleting} />
      )}
    </div>
  );
});
SingleComment.displayName = "SingleComment";
export default SingleComment;
