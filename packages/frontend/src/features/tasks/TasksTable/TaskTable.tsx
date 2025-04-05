import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import MasterTable from "../../../shared/components/masterTable/MasterTable";
import { teamSelectors } from "../../teams/teamSlice";
import { useTaskCreatedEvent } from "../hooks/useTaskCreatedEvent";
import { useTaskDeletedEvent } from "../hooks/useTaskDeletedEvent";
import { useTaskUpdatedEvent } from "../hooks/useTaskUpdatedEvent";
import { ITask } from "../tasksInterface";
import { tasksSelectors } from "../tasksSlice";
import QueryTask from "./components/QueryTask";
import TaskTableRow from "./components/TaskTableRow";
import taskColumnsFactory from "./constant/taskColumns";
import UseTasksTable from "./UseTasksTable";

const TasksTable = memo(() => {
  UseTasksTable();
  // const allTasks = useSelector((state: RootState) => tasksSelectors.selectAll(state));
  const [updatedTasks, setUpdatedTasks] = useState<ITask[]>([]);
  const { taskCreated, clearTaskCreated } = useTaskCreatedEvent();
  const { taskUpdated, clearTaskUpdated } = useTaskUpdatedEvent();
  const { taskDeleted, clearTaskDeleted } = useTaskDeletedEvent();

  const allTeamsName = useSelector((state: RootState) => teamSelectors.selectAll(state))?.map((team) => team.name);
  const tasksColumns = taskColumnsFactory(allTeamsName);
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

  // Sort tasks by due date
  const unAssignedTask = updatedTasks.filter((task) => task.assignedTo?.length === 0);
  const assignedTask = updatedTasks.filter(
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
              aria-label={`All(${updatedTasks.length})`}
              defaultChecked
            />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box w-full overflow-hidden">
              <TaskTable
                name="All Task"
                tableHead={tasksColumns}
                data={updatedTasks as (ITask & Record<string, unknown>)[]}
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
