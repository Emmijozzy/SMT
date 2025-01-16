import { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import MasterTable from "../../../shared/components/masterTable/MasterTable";
import { teamSelectors } from "../../teams/teamSlice";
import { ITask } from "../tasksInterface";
import { tasksSelectors } from "../tasksSlice";
import QueryTask from "./components/QueryTask";
import TaskTableRow from "./components/TaskTableRow";
import taskColumnsFactory from "./constant/taskColumns";
import UseTasksTable from "./UseTasksTable";

const TasksTable = memo(() => {
  UseTasksTable();
  // const allTasks = useSelector((state: RootState) => tasksSelectors.selectAll(state));
  const allTeamsName = useSelector((state: RootState) => teamSelectors.selectAll(state))?.map((team) => team.name);
  const tasksColumns = taskColumnsFactory(allTeamsName);
  const allTasks = useSelector((state: RootState) => tasksSelectors.selectAll(state));

  const unAssignedTask = allTasks.filter((task) => task.assignedTo?.length === 0);
  const assignedTask = allTasks.filter(
    (task) => task?.assignedTo?.length !== undefined && task?.assignedTo?.length >= 1,
  );

  const TaskTable = MasterTable<ITask & Record<string, unknown>>();

  return (
    <>
      <QueryTask />
      <div className="w-full">
        <div className="w-full overflow-clip">
          <div role="tablist" className="tabs tabs-boxed">
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="w-20 tab font-bold"
              aria-label={`All(${allTasks.length})`}
              defaultChecked
            />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box w-full overflow-hidden">
              <TaskTable
                name="All Task"
                tableHead={tasksColumns}
                data={allTasks as (ITask & Record<string, unknown>)[]}
                TableBody={TaskTableRow}
              />
            </div>
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className=" w-40 tab font-bold"
              aria-label={`Unassigned (${unAssignedTask.length})`}
            />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box w-full overflow-hidden">
              <TaskTable
                name="Unassigned Task"
                tableHead={tasksColumns}
                data={unAssignedTask as (ITask & Record<string, unknown>)[]}
                TableBody={TaskTableRow}
              />
            </div>

            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="w-32 tab font-bold"
              aria-label={`Assigned (${assignedTask.length})`}
            />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box w-full overflow-hidden">
              <TaskTable
                name="Assigned Task"
                tableHead={tasksColumns}
                data={assignedTask as (ITask & Record<string, unknown>)[]}
                TableBody={TaskTableRow}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default TasksTable;
