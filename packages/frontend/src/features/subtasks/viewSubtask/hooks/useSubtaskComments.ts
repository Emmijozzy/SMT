import { useCallback } from "react";
import { CommentData } from "../../../Comment/commentInterface";
import { useGetCommentBySubtaskIdQuery } from "../../../Comment/commentsApiSlice";
import useAddComment from "../../../Comment/hooks/useAddComment";
import useDeleteComment from "../../../Comment/hooks/useDeleteComment";
import useEditComment from "../../../Comment/hooks/useEditComment";

export function useSubtaskComments(subtaskId: string) {
  const {
    data: comments,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetCommentBySubtaskIdQuery(subtaskId, {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
  });

  const { isSubmitting, addComment } = useAddComment();
  const { editComment } = useEditComment();
  const { deleteComment } = useDeleteComment();

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

  return {
    comments: comments || [],
    isLoading,
    isError,
    error,
    isSubmitting,
    handleAddComment,
    handleEditComment,
    handleDeleteComment,
  };
}
