import { lazy } from "react";

const Subtask = lazy(() => import("../../features/subtasks/Subtask"));
const SubtasksTable = lazy(() => import("../../features/subtasks/subtasksTable/SubtasksTable"));
const ViewSubtask = lazy(() => import("../../features/subtasks/viewSubtask/ViewSubtask"));

export const subtaskRoutes = {
  path: "dash/subtasks",
  component: Subtask,
  children: [
    { index: true, component: SubtasksTable },
    { path: "subtask/:subtaskId", component: ViewSubtask },
  ],
};
