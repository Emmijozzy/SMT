import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetTasksQuery } from "../tasksApiSlice";
import { setTasks, tasksSelectors } from "../tasksSlice";
import { RootState } from "../../../app/store";
import { setTotalRows } from "./tasksTableSlice";

function UseTasksTable() {
  const [filteredTask, setFilteredTask] = useState<string[]>();
  const { data, isLoading, isSuccess, isError, error } = useGetTasksQuery();
  const [totalTasks, setTotalTasks] = useState<string[]>();

  const dispatch = useDispatch();

  const memoizedData = useMemo(() => data, [data]);

  useEffect(() => {
    if (memoizedData) {
      dispatch(setTasks(memoizedData));
      dispatch(setTotalRows(memoizedData.length));
    }
  }, [memoizedData, dispatch]);

  const totalTaskIds = useSelector((state: RootState) => tasksSelectors.selectIds(state));

  useEffect(() => {
    setTotalTasks(totalTaskIds);
  }, [totalTaskIds]);

  const currentPage = useSelector((state: RootState) => state.taskTable.pagination.currentPage);
  const rowsPerPage = useSelector((state: RootState) => state.taskTable.pagination.rowsPerPage);

  const filterTask = useMemo(() => {
    const firstRoleTask = rowsPerPage * currentPage - rowsPerPage;
    const lastRoleTask = firstRoleTask + rowsPerPage;
    return totalTasks?.slice(firstRoleTask, lastRoleTask);
  }, [currentPage, rowsPerPage, totalTasks]);

  useEffect(() => {
    setFilteredTask(filterTask);
  }, [filterTask]);

  return {
    totalTasks,
    filteredTask,
    isError,
    isLoading,
    isSuccess,
    error,
  };
}
export default UseTasksTable;
