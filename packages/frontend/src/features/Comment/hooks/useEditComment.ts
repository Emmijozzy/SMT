import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import ResData from "../../../shared/interface/resData";
import { addAlert } from "../../alerts/AlertSlice";
import { CommentData, CommentType } from "../commentInterface";
import { useUpdateCommentMutation } from "../commentsApiSlice";

function useEditComment() {
  const [isEditing, setIsEditing] = useState(false);
  const [updateComment, { isLoading, error }] = useUpdateCommentMutation();
  const dispatch = useDispatch();

  const editComment = useCallback(
    async (commentData: CommentData) => {
      setIsEditing(true);
      try {
        const resData = (await updateComment(commentData)) as ResData<CommentType>;
        if (Object.keys(resData)[0] === "error" || error) {
          const resError = resData.error;
          throw new Error(resError?.data?.message);
        }
      } catch (e) {
        const err = e as Error;
        dispatch(addAlert({ message: err.message, type: "error" }));
      } finally {
        setIsEditing(false);
      }
    },
    [dispatch, updateComment, error],
  );

  return {
    isEditing,
    editComment,
    isLoading,
  };
}

export default useEditComment;
