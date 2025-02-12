import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import ResData from "../../../../shared/interface/resData";
import log from "../../../../shared/utils/log";
import { addAlert } from "../../../alerts/AlertSlice";
import { setLoader } from "../../../loading/loaderSlice";
import {
  useUpdateSubtaskInReviewToCompleteMutation,
  useUpdateSubtaskInReviewToRevisitMutation,
  useUpdateSubtaskOpenToInProcessMutation,
  useUpdateSubtaskToInReviewMutation,
} from "../../subtaskApiSlice";
import { InReviewFeedBackData, InReviewUpdateData, ISubtask } from "../../subtaskInterface";

const useStatusAction = (subtask: ISubtask) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { subtaskId } = subtask;

  const [updateSubtaskOpenToInProcessMutation, { isError: InErrorInProcess }] =
    useUpdateSubtaskOpenToInProcessMutation();
  const [updateSubtaskToInReviewMutation, { isError: isErrorInReview }] = useUpdateSubtaskToInReviewMutation();
  const [updateSubtaskInReviewToRevisitMutation, { isError: isErrorRevisit }] =
    useUpdateSubtaskInReviewToRevisitMutation();
  const [updateSubtaskInReviewToCompleteMutation, { isError: isErrorCompleted }] =
    useUpdateSubtaskInReviewToCompleteMutation();

  const handleStatusUpdate = useCallback(
    async (
      // eslint-disable-next-line @typescript-eslint/ban-types
      mutationFn: Function,
      data: InReviewUpdateData | InReviewFeedBackData | Record<string, never>,
      successMessage: string,
      isError: boolean,
      errorContext: string,
    ) => {
      setIsSubmitting(true);
      dispatch(setLoader(true));
      try {
        const resData = (await mutationFn({
          subtaskId,
          body: data,
        })) as ResData<ISubtask>;

        if (Object.keys(resData)[0] === "error" || isError) {
          const resError = resData.error as ResData<ISubtask>;
          throw new Error(resError.data.message);
        }

        dispatch(
          addAlert({
            message: resData?.data?.message || successMessage,
            type: "success",
          }),
        );
        window.history.back();
      } catch (e) {
        const err = e as Error;
        dispatch(addAlert({ message: err.message, type: "error" }));
        log("error", `Error in transition to ${errorContext}`, err.message, err.stack as string);
      } finally {
        setIsSubmitting(false);
        dispatch(setLoader(false));
      }
    },
    [dispatch, subtaskId],
  );

  const updateSubtaskOpenToInProcess = useCallback(
    () =>
      handleStatusUpdate(
        updateSubtaskOpenToInProcessMutation,
        {},
        "Subtask transitioned in_process successfully",
        InErrorInProcess,
        "in_process",
      ),
    [handleStatusUpdate, updateSubtaskOpenToInProcessMutation, InErrorInProcess],
  );

  const updateSubtaskToInReview = useCallback(
    (inReviewUpdateData: InReviewUpdateData) =>
      handleStatusUpdate(
        updateSubtaskToInReviewMutation,
        inReviewUpdateData,
        "Subtask transitioned in_review successfully",
        isErrorInReview,
        "in_review",
      ),
    [handleStatusUpdate, updateSubtaskToInReviewMutation, isErrorInReview],
  );

  const updateSubtaskInReviewToRevisit = useCallback(
    (revisitUpdateData: InReviewFeedBackData) =>
      handleStatusUpdate(
        updateSubtaskInReviewToRevisitMutation,
        revisitUpdateData,
        "Subtask transitioned revisit successfully",
        isErrorRevisit,
        "revisit",
      ),
    [handleStatusUpdate, updateSubtaskInReviewToRevisitMutation, isErrorRevisit],
  );

  const updateSubtaskInReviewToCompleted = useCallback(
    (completeUpdateData: InReviewFeedBackData) =>
      handleStatusUpdate(
        updateSubtaskInReviewToCompleteMutation,
        completeUpdateData,
        "Subtask transitioned complete successfully",
        isErrorCompleted,
        "complete",
      ),
    [handleStatusUpdate, updateSubtaskInReviewToCompleteMutation, isErrorCompleted],
  );

  return {
    updateSubtaskOpenToInProcess,
    updateSubtaskToInReview,
    updateSubtaskInReviewToRevisit,
    updateSubtaskInReviewToCompleted,
    isSubmitting,
  };
};

export default useStatusAction;
