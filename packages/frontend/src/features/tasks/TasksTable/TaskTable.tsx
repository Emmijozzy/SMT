import React, { memo, useMemo } from "react";
import TableHead from "./components/TableHead";
import Pagination from "./components/Pagination";
import QueryTask from "./components/QueryTask";
import UseTasksTable from "./UseTasksTable";
import TaskTableRow from "./components/TaskTableRow";

const TasksTable = memo(() => {
  const { totalTasks, filteredTask, handleSearchId } = UseTasksTable();

  // Memoize filtered tasks to avoid unnecessary recalculations
  const memoizedFilteredTasks = useMemo(() => filteredTask || [], [filteredTask]);

  return (
    <>
      <QueryTask handleSearchId={handleSearchId} />
      <div className="container">
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-base-200 text-base-content/70">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                  <h3 className="font-semibold text-lg text-base-content">Tasks Table</h3>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto  overflow-y-hidden">
              <table className="items-center w-full bg-transparent border-collapse overflow-visible ">
                <TableHead />
                <tbody className="mb-10">
                  {memoizedFilteredTasks.length > 0 ? (
                    memoizedFilteredTasks.map((id) => <TaskTableRow key={id} taskId={id} />)
                  ) : (
                    <tr>
                      <td className="text-center">No tasks found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="w-full flex justify-center items-center gap-32 py-2 px-2 border-t-2">
              <Pagination totalRows={totalTasks?.length || 0} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default TasksTable;
