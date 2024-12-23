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
      <div role="tablist" className="tabs tabs-boxed">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab font-bold"
          aria-label={`All(${allTasks.length})`}
          defaultChecked
        />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box">
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
          className="tab font-bold"
          aria-label={`Unassigned (${unAssignedTask.length})`}
        />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box">
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
          className="tab font-bold"
          aria-label={`Assigned (${assignedTask.length})`}
        />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box">
          <TaskTable
            name="Assigned Task"
            tableHead={tasksColumns}
            data={assignedTask as (ITask & Record<string, unknown>)[]}
            TableBody={TaskTableRow}
          />
        </div>
      </div>
    </>
  );
});

export default TasksTable;
