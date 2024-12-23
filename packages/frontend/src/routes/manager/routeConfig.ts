import { lazy } from "react";
import { userRoutes } from "./userRoutes";
import { taskRoutes } from "./taskRoutes";
import { subtaskRoutes } from "./subtaskRoutes";

const Dashboard = lazy(() => import("../../features/Dashboard/Dashboard"));
const Profile = lazy(() => import("../../features/profile/Profile"));

export const managerRouteConfig = [
  {
    path: "dash",
    component: Dashboard,
    // index: true,
  },
  userRoutes,
  taskRoutes,
  subtaskRoutes,
  {
    path: "profile",
    component: Profile,
  },
];
