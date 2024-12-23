import { lazy } from "react";
import { userRoutes } from "./userRoutes";
import { taskRoutes } from "./taskRoutes";
import { teamRoutes } from "./teamRoutes";
import { subtaskRoutes } from "./subtaskRoutes";

const Dashboard = lazy(() => import("../../features/Dashboard/Dashboard"));
const Profile = lazy(() => import("../../features/profile/Profile"));

export const adminRouteConfig = [
  {
    path: "dash",
    component: Dashboard,
  },
  userRoutes,
  taskRoutes,
  teamRoutes,
  subtaskRoutes,
  {
    path: "profile",
    component: Profile,
  },
];
