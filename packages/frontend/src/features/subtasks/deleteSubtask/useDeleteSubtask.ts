import { useCallback } from "react";
import { useDispatch } from "react-redux";
import ResData from "../../../shared/interface/resData";
import log from "../../../shared/utils/log";
import { addAlert } from "../../alerts/AlertSlice";
import { setLoader } from "../../loading/loaderSlice";
import { useDeleteSubtaskMutation } from "../subtaskApiSlice";

function useDeleteSubtask(subtaskId: string) {
  const dispatch = useDispatch();
  const [deleteSubtask, { isError, error: resErr }] = useDeleteSubtaskMutation();

  const handleDeleteSubtask = useCallback(async () => {
    if (!subtaskId) return;

    dispatch(setLoader(true));

    try {
      const resData = (await deleteSubtask(subtaskId).unwrap()) as ResData;

      if (Object.keys(resData)[0] === "error" || isError) {
        const resError = resData?.error as ResData;
        throw new Error(resError?.data?.message || (resErr as string) || "Failed to delete subtask. No Error message");
      }

      dispatch(
        addAlert({
          message: resData?.data?.message || "Subtask deleted successfully.",
          type: "success",
        }),
      );

      window.history.back();
    } catch (e) {
      const error = e as Error;
      dispatch(
        addAlert({
          message: "Failed to delete subtask.",
          type: "error",
        }),
      );
      log("error", "Failed to delete subtask.", error.message, "useDeleteSubtask", error.stack as string);
    } finally {
      dispatch(setLoader(false));
    }
  }, [subtaskId, deleteSubtask, dispatch, isError, resErr]);

  return { handleDeleteSubtask };
}

export default useDeleteSubtask;
