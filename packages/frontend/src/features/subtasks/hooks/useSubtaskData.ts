import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useGetSubtaskQuery } from "../subtaskApiSlice";
import { subtasksSelectors } from "../subtaskSlice";

export const useSubtaskData = (subtaskId: string) => {
  const {
    data: loadedSubtask,
    isFetching,
    isError,
  } = useGetSubtaskQuery(subtaskId, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    refetchOnReconnect: true,
    pollingInterval: 30000,
  });
  const subtask = useSelector((state: RootState) => subtasksSelectors.selectById(state, subtaskId)) || loadedSubtask;

  return { subtask, isFetching, isError };
};
