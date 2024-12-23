import { lazy } from "react";

const Users = lazy(() => import("../../features/users/Users"));
const MemberTable = lazy(() => import("../../features/users/manager/MemberTable"));
const ViewUser = lazy(() => import("../../features/users/viewUser/ViewUser"));
const AddUser = lazy(() => import("../../features/users/AddUser/AddUser"));

export const userRoutes = {
  path: "dash/users",
  component: Users,
  children: [
    { index: true, component: MemberTable },
    { path: ":userId/view", component: ViewUser },
    { path: "add-new-user", component: AddUser },
  ],
};
