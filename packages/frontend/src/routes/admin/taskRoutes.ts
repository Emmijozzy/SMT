import { lazy } from "react";

const Tasks = lazy(() => import("../../features/tasks/Tasks"));
const TasksTable = lazy(() => import("../../features/tasks/TasksTable/TaskTable"));
const CreateTask = lazy(() => import("../../features/tasks/createTask/CreateTask"));
const ViewTask = lazy(() => import("../../features/tasks/viewTask/ViewTask"));
const AddSubtask = lazy(() => import("../../features/subtasks/addSubtask/addSubtask"));
const ViewSubtask = lazy(() => import("../../features/subtasks/viewSubtask/ViewSubtask"));

export const taskRoutes = {
  path: "dash/tasks",
  component: Tasks,
  children: [
    { index: true, component: TasksTable },
    { path: "create_task", component: CreateTask },
    { path: ":taskId", component: ViewTask },
    { path: ":taskId/add_subtask", component: AddSubtask },
    { path: ":taskId/subtask/:subtaskId", component: ViewSubtask },
  ],
};
