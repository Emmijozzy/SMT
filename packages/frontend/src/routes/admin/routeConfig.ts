import { lazy } from "react";
import { userRoutes } from "./userRoutes";
import { taskRoutes } from "./taskRoutes";
import { teamRoutes } from "./teamRoutes";
import { subtaskRoutes } from "./subtaskRoutes";

const Dashboard = lazy(() => import("../../features/Dashboard/Dashboard"));
const Profile = lazy(() => import("../../features/profile/Profile"));
const Page404 = lazy(() => import("../../features/Page404"));

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
  {
    path: "*",
    component: Page404,
  },
];
