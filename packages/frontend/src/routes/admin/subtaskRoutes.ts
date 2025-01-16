import { lazy } from "react";

const Subtask = lazy(() => import("../../features/subtasks/Subtask"));
const SubtasksTable = lazy(() => import("../../features/subtasks/subtasksTable/SubtasksTable"));
const AddSubtask = lazy(() => import("../../features/subtasks/addSubtask/addSubtask"));
const ViewSubtask = lazy(() => import("../../features/subtasks/viewSubtask/ViewSubtask"));

export const subtaskRoutes = {
  path: "dash/subtasks",
  component: Subtask,
  children: [
    { index: true, component: SubtasksTable },
    { path: "add_subtask", component: AddSubtask },
    { path: "subtask/:subtaskId", component: ViewSubtask },
  ],
};
