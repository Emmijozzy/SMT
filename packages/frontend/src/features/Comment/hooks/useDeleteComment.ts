import { useCallback } from "react";
import { useDispatch } from "react-redux";
import ResData from "../../../shared/interface/resData";
import { addAlert } from "../../alerts/AlertSlice";
import { CommentType } from "../commentInterface";
import { useDeleteCommentMutation } from "../commentsApiSlice";

function useDeleteComment() {
  const [removeComment, { isSuccess, isError, isLoading }] = useDeleteCommentMutation();
  const dispatch = useDispatch();

  const deleteComment = useCallback(
    async (commentId: string) => {
      try {
        const resData = (await removeComment(commentId)) as ResData<CommentType>;
        if (Object.keys(resData)[0] === "error" || isError) {
          const resError = resData.error;
          throw new Error(resError?.data?.message);
        }
      } catch (e) {
        const err = e as Error;
        dispatch(addAlert({ message: err.message, type: "error" }));
      }
    },
    [dispatch, removeComment, isError],
  );

  return {
    isLoading,
    deleteComment,
    isSuccess,
  };
}

export default useDeleteComment;
