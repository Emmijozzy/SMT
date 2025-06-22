import { lazy } from "react";
import { userRoutes } from "./userRoutes";
import { taskRoutes } from "./taskRoutes";
import { subtaskRoutes } from "./subtaskRoutes";

const Dashboard = lazy(() => import("../../features/Dashboard/ManagerDashboard/ManagerDashboard"));
const Profile = lazy(() => import("../../features/profile/Profile"));
const Page404 = lazy(() => import("../../features/Page404"));

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
  {
    path: "*",
    component: Page404,
  },
];
