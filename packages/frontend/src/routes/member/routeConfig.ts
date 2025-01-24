import { lazy } from "react";

const Dashboard = lazy(() => import("../../features/Dashboard/Dashboard"));
const Profile = lazy(() => import("../../features/profile/Profile"));
const Page404 = lazy(() => import("../../features/Page404"));

export const memberRouteConfig = [
  {
    path: "dash",
    component: Dashboard,
  },
  {
    path: "profile",
    component: Profile,
  },
  {
    path: "*",
    component: Page404,
  },
];
