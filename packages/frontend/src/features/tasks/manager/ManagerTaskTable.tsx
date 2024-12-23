import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import MasterTable from "../../../shared/components/masterTable/MasterTable";
import { ITask } from "../tasksInterface";
import { tasksSelectors } from "../tasksSlice";
import ManagerTaskRow from "./ManagerTaskRow";
import useManagerTaskTable from "./useManagerTaskTable";
import { managerTaskColumns } from "./managerTaskColumns";

function ManagerTaskTable() {
  useManagerTaskTable();
  const allTasks = useSelector((state: RootState) => tasksSelectors.selectAll(state));

  const unAssignedTask = allTasks.filter((task) => task.assignedTo?.length === 0);
  const assignedTask = allTasks.filter(
    (task) => task?.assignedTo?.length !== undefined && task?.assignedTo?.length >= 1,
  );

  const TaskTable = MasterTable<ITask & Record<string, unknown>>();

  return (
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
          tableHead={managerTaskColumns}
          data={allTasks as (ITask & Record<string, unknown>)[]}
          TableBody={ManagerTaskRow}
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
          tableHead={managerTaskColumns}
          data={unAssignedTask as (ITask & Record<string, unknown>)[]}
          TableBody={ManagerTaskRow}
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
          tableHead={managerTaskColumns}
          data={assignedTask as (ITask & Record<string, unknown>)[]}
          TableBody={ManagerTaskRow}
        />
      </div>
    </div>
  );
}

export default ManagerTaskTable;
