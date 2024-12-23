/* eslint-disable indent */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetTasksQuery } from "../tasksApiSlice";
import { setTasks } from "../tasksSlice";

function UseTasksTable() {
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError, error } = useGetTasksQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
  });

  useEffect(() => {
    if (data) {
      dispatch(setTasks(data));
    }
  }, [data, dispatch]);

  return {
    isError,
    isLoading,
    isSuccess,
    error,
  };
}

export default UseTasksTable;
