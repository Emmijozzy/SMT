import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import ResData from "../../../shared/interface/resData";
import { addAlert } from "../../alerts/AlertSlice";
import { CommentData, CommentType } from "../commentInterface";
import { useCreateCommentMutation } from "../commentsApiSlice";

function useAddComment() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createComment, { isSuccess, isError }] = useCreateCommentMutation();
  const dispatch = useDispatch();

  const addComment = useCallback(
    async (data: CommentData) => {
      setIsSubmitting(true);
      try {
        const resData = (await createComment(data)) as ResData<CommentType>;

        if (Object.keys(resData)[0] === "error" || isError) {
          const resError = resData.error;
          throw new Error(resError?.data?.message);
        }
      } catch (e) {
        const err = e as Error;
        dispatch(addAlert({ message: err.message, type: "error" }));
      } finally {
        setIsSubmitting(false);
      }
    },
    [createComment, dispatch, isError],
  );

  return {
    isSubmitting,
    addComment,
    isSuccess,
  };
}

export default useAddComment;
