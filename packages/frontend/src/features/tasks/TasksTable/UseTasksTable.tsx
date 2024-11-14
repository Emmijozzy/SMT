import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useGetTasksQuery } from "../tasksApiSlice";
import { setTasks } from "../tasksSlice";
import { setTotalRows } from "./tasksTableSlice";

function UseTasksTable() {
  const { data, isLoading, isSuccess, isError, error } = useGetTasksQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const dispatch = useDispatch();
  const memoizedData = useMemo(() => data, [data]);

  useEffect(() => {
    if (memoizedData) {
      dispatch(setTasks(memoizedData));
      dispatch(setTotalRows(memoizedData.length));
    }
  }, [memoizedData, dispatch]);

  return {
    isError,
    isLoading,
    isSuccess,
    error,
  };
}
export default UseTasksTable;
