import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader } from "../../../routes/LazyWrapper2";
import QuillEditor from "../../../shared/components/Editor/QuilEditor";
import Comment from "../../Comment/Comment";
import { CommentData } from "../../Comment/commentInterface";
import { useGetCommentBySubtaskIdQuery } from "../../Comment/commentsApiSlice";
import useAddComment from "../../Comment/hooks/useAddComment";
import useDeleteComment from "../../Comment/hooks/useDeleteComment";
import useEditComment from "../../Comment/hooks/useEditComment";
import { addAlert } from "../../alerts/AlertSlice";
import ViewSubtaskDetails from "../ViewSubtaskDetails";
import DeleteSubtaskModal from "../deleteSubtask/DeleteSubtaskModal";
import EditSubtaskDetails from "../editSubtaskDetails/EditSubtaskDetails";

function ViewSubtask() {
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { subtaskId } = useParams();
  const dispatch = useDispatch();
  const {
    data: comments,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetCommentBySubtaskIdQuery(subtaskId as string, {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
  });

  const memoizedComments = useMemo(() => comments || [], [comments]);
  const hasComments = memoizedComments.length > 0;

  useEffect(() => {
    if (isError && error) {
      dispatch(addAlert({ message: (error as string) || "Error fetching comments", type: "error" }));
    }
  }, [isError, error, dispatch]);

  const { isSubmitting, addComment } = useAddComment();
  const { editComment, isEditing } = useEditComment();
  const { isLoading: isDeleting, deleteComment } = useDeleteComment();

  const handleAddComment = useCallback(
    async (commentData: CommentData) => {
      await addComment(commentData);
      await refetch();
    },
    [addComment, refetch],
  );

  const handleEditComment = useCallback(
    async (commentData: CommentData) => {
      await editComment(commentData);
      await refetch();
    },
    [editComment, refetch],
  );

  const handleDeleteComment = useCallback(
    async (commentId: string) => {
      await deleteComment(commentId);
      await refetch();
    },
    [deleteComment, refetch],
  );
  return (
    <>
      {showEdit ? (
        <EditSubtaskDetails showEdit={() => setShowEdit(false)} />
      ) : (
        <ViewSubtaskDetails showDeleteModal={() => setShowDeleteModal(true)} showEdit={() => setShowEdit(true)} />
      )}

      <div className="container transition-all">
        <div className="w-full flex justify-between">
          <h6 className="h6 px-2">Comments</h6>
        </div>
        <div>
          <QuillEditor handleAddComment={handleAddComment} isAdding={isSubmitting} />
          {isLoading ? (
            <Loader transparent />
          ) : (
            hasComments && (
              <Comment
                comments={memoizedComments}
                onEdit={handleEditComment}
                isEditing={isEditing}
                onDelete={handleDeleteComment}
                isDeleting={isDeleting}
              />
            )
          )}
        </div>
      </div>
      {showDeleteModal && <DeleteSubtaskModal onClose={() => setShowDeleteModal(false)} />}
    </>
  );
}
export default ViewSubtask;
