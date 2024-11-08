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
  const allTasks = useSelector((state: RootState) => tasksSelectors.selectAll(state));
  const allTeamsName = useSelector((state: RootState) => teamSelectors.selectAll(state))?.map((team) => team.name);
  const tasksColumns = taskColumnsFactory(allTeamsName);
  const MasterTaskTable = MasterTable<ITask & Record<string, unknown>>();

  return (
    <>
      <QueryTask />
      <MasterTaskTable
        name="Tasks"
        data={allTasks as (ITask & Record<string, unknown>)[]}
        tableHead={tasksColumns}
        TableBody={TaskTableRow}
      />
    </>
  );
});

export default TasksTable;
