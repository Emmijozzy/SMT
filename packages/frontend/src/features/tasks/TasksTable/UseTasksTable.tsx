import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetTasksQuery } from "../tasksApiSlice";
import { setTasks, tasksSelectors } from "../tasksSlice";
import { RootState } from "../../../app/store";
import { setTotalRows } from "./tasksTableSlice";
import removeSpecialCharacters from "../../../shared/utils/removeSpecialCharacters";

function UseTasksTable() {
  const [filteredTask, setFilteredTask] = useState<string[]>();
  const { data, isLoading, isSuccess, isError, error } = useGetTasksQuery();
  const [totalTasks, setTotalTasks] = useState<string[]>();
  const [searchId, setSearchId] = useState<string>();

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
    const searchedtaskId = (search: string): string[] => {
      const searchReg = new RegExp(removeSpecialCharacters(search.trim()), "gi");
      const foundTask = totalTaskIds?.filter((Id) => Id?.match(searchReg));
      return foundTask && foundTask?.length > 0 ? foundTask : [];
    };

    if (searchId?.trim()) {
      setFilteredTask(searchedtaskId(searchId));
    } else {
      setFilteredTask(filterTask);
    }
  }, [filterTask, searchId, setSearchId, totalTaskIds]);

  const handleSearchId = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchId(e.target.value);
  };

  return {
    totalTasks,
    filteredTask,
    isError,
    isLoading,
    isSuccess,
    error,
    handleSearchId,
  };
}
export default UseTasksTable;
