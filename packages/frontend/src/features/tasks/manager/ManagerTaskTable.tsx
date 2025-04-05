import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import MasterTable from "../../../shared/components/masterTable/MasterTable";
import { useTaskCreatedEvent } from "../hooks/useTaskCreatedEvent";
import { useTaskDeletedEvent } from "../hooks/useTaskDeletedEvent";
import { useTaskUpdatedEvent } from "../hooks/useTaskUpdatedEvent";
import { ITask } from "../tasksInterface";
import { tasksSelectors } from "../tasksSlice";
import { managerTaskColumns } from "./managerTaskColumns";
import ManagerTaskRow from "./ManagerTaskRow";
import useManagerTaskTable from "./useManagerTaskTable";

function ManagerTaskTable() {
  useManagerTaskTable();
  const [updatedTasks, setUpdatedTasks] = useState<ITask[]>([]);
  const { taskCreated, clearTaskCreated } = useTaskCreatedEvent();
  const { taskUpdated, clearTaskUpdated } = useTaskUpdatedEvent();
  const { taskDeleted, clearTaskDeleted } = useTaskDeletedEvent();

  const allTasks = useSelector((state: RootState) => tasksSelectors.selectAll(state));

  useEffect(() => {
    // Initialize with fetched tasks if we don't have any yet
    if (allTasks && updatedTasks.length === 0) {
      setUpdatedTasks(allTasks);
      return;
    }

    const newTasks = [...updatedTasks];
    let hasChanged = false;

    // Handle created tasks
    if (taskCreated.length > 0) {
      taskCreated.forEach((createdTask) => {
        const existingTaskIndex = newTasks.findIndex((task) => task.taskId === createdTask.taskId);
        if (existingTaskIndex === -1) {
          newTasks.push(createdTask);
          hasChanged = true;
        }
      });
      clearTaskCreated();
    }

    // Handle updated tasks
    if (taskUpdated.length > 0) {
      taskUpdated.forEach((updatedTask) => {
        const existingTaskIndex = newTasks.findIndex((task) => task.taskId === updatedTask.taskId);
        if (existingTaskIndex !== -1) {
          newTasks[existingTaskIndex] = updatedTask;
          hasChanged = true;
        }
      });
      clearTaskUpdated();
    }

    // Handle deleted tasks
    if (taskDeleted.length > 0) {
      taskDeleted.forEach((deletedTask) => {
        const existingTaskIndex = newTasks.findIndex((task) => task.taskId === deletedTask.taskId);
        if (existingTaskIndex !== -1) {
          newTasks.splice(existingTaskIndex, 1);
          hasChanged = true;
        }
      });
      clearTaskDeleted();
    }

    if (hasChanged) {
      setUpdatedTasks(newTasks);
    }
  }, [
    allTasks,
    updatedTasks,
    taskCreated,
    taskUpdated,
    taskDeleted,
    clearTaskCreated,
    clearTaskUpdated,
    clearTaskDeleted,
  ]);

  const unAssignedTask = updatedTasks.filter((task) => task.assignedTo?.length === 0);
  const assignedTask = updatedTasks.filter(
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
            aria-label={`All(${updatedTasks.length})`}
            defaultChecked
          />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box w-full overflow-hidden">
            <TaskTable
              name="All Task"
              tableHead={managerTaskColumns}
              data={updatedTasks as (ITask & Record<string, unknown>)[]}
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
