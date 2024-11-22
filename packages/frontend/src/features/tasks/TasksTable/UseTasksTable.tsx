import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useGetTasksQuery } from "../tasksApiSlice";
import { setTasks } from "../tasksSlice";

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
