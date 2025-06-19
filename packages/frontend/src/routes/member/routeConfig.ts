import { lazy } from "react";
import { subtaskRoutes } from "./subtaskRoutes";

const Dashboard = lazy(() => import("../../features/Dashboard/memberDashboard/MemberDashboard"));
const Profile = lazy(() => import("../../features/profile/Profile"));
const Page404 = lazy(() => import("../../features/Page404"));

export const memberRouteConfig = [
  {
    path: "dash",
    component: Dashboard,
  },
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
