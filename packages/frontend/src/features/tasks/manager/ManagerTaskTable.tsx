import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import MasterTable from "../../../shared/components/masterTable/MasterTable";
import { ITask } from "../tasksInterface";
import { tasksSelectors } from "../tasksSlice";
import { managerTaskColumns } from "./managerTaskColumns";
import ManagerTaskRow from "./ManagerTaskRow";
import useManagerTaskTable from "./useManagerTaskTable";

function ManagerTaskTable() {
  useManagerTaskTable();
  const allTasks = useSelector((state: RootState) => tasksSelectors.selectAll(state));

  const unAssignedTask = allTasks.filter((task) => task.assignedTo?.length === 0);
  const assignedTask = allTasks.filter(
    (task) => task?.assignedTo?.length !== undefined && task?.assignedTo?.length >= 1,
  );

  const TaskTable = MasterTable<ITask & Record<string, unknown>>();

  return (
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
              tableHead={managerTaskColumns}
              data={allTasks as (ITask & Record<string, unknown>)[]}
              TableBody={ManagerTaskRow}
            />
          </div>
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className=" w-36 tab font-bold"
            aria-label={`Unassigned (${unAssignedTask.length})`}
          />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box w-full overflow-hidden">
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
            className="w-32 tab font-bold"
            aria-label={`Assigned (${assignedTask.length})`}
          />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box w-full overflow-hidden">
            <TaskTable
              name="Assigned Task"
              tableHead={managerTaskColumns}
              data={assignedTask as (ITask & Record<string, unknown>)[]}
              TableBody={ManagerTaskRow}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerTaskTable;
