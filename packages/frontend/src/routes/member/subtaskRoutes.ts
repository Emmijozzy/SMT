import { lazy } from "react";

const Subtask = lazy(() => import("../../features/subtasks/member/Subtasks"));
const SubtasksTable = lazy(() => import("../../features/subtasks/member/subtaskTable/SubtaskTable"));
const ViewSubtask = lazy(() => import("../../features/subtasks/viewSubtask/ViewSubtask"));

export const subtaskRoutes = {
  path: "dash/subtasks",
  component: Subtask,
  children: [
    { index: true, component: SubtasksTable },
    { path: "subtask/:subtaskId", component: ViewSubtask },
  ],
};
