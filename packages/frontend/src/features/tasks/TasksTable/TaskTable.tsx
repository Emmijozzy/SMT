import { memo, useMemo } from "react";
import Pagination from "./components/Pagination";
import QueryTask from "./components/QueryTask";
import TableHead from "./components/TableHead";
import TaskTableRow from "./components/TaskTableRow";
import UseTasksTable from "./UseTasksTable";

const TasksTable = memo(() => {
  const { totalTasks, filteredTask, handleSearchId } = UseTasksTable();

  const memoizedFilteredTasks = useMemo(() => filteredTask || [], [filteredTask]);

  return (
    <>
      <QueryTask handleSearchId={handleSearchId} />
      <div className="container mx-auto px-4">
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-base-200 text-base-content/70">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-lg text-base-content">Tasks Table</h3>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto z-[99999]">
              <div className="block w-full overflow-">
                <table className="items-center w-full bg-transparent border-collapse overflow-scroll">
                  <TableHead />
                  <tbody className="mb-10 mt-2">
                    {memoizedFilteredTasks.length > 0 ? (
                      memoizedFilteredTasks.map((id, i) =>
                        i === 0 ? <TaskTableRow key={id} taskId={id} /> : <TaskTableRow key={id} taskId={id} />,
                      )
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center py-4">
                          No tasks found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <Pagination totalRows={totalTasks?.length || 0} />
          </div>
        </div>
      </div>
    </>
  );
});

export default TasksTable;
