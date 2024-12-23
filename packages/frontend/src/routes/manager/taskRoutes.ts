import { lazy } from "react";

const Tasks = lazy(() => import("../../features/tasks/Tasks"));
const ManagerTaskTable = lazy(() => import("../../features/tasks/manager/ManagerTaskTable"));
const ViewTask = lazy(() => import("../../features/tasks/viewTask/ViewTask"));
const AddSubtask = lazy(() => import("../../features/subtasks/addSubtask/addSubtask"));

export const taskRoutes = {
  path: "dash/tasks",
  component: Tasks,
  children: [
    { index: true, component: ManagerTaskTable },
    { path: ":taskId", component: ViewTask },
    { path: ":taskId/add_subtask", component: AddSubtask },
  ],
};
