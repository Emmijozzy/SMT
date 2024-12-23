import { lazy } from "react";

const Users = lazy(() => import("../../features/users/Users"));
const UserTable = lazy(() => import("../../features/users/UserTable/UserTable"));
const AddUser = lazy(() => import("../../features/users/AddUser/AddUser"));
const ViewUser = lazy(() => import("../../features/users/viewUser/ViewUser"));
const EditUser = lazy(() => import("../../features/users/EditUser/EditUser"));

export const userRoutes = {
  path: "dash/users",
  component: Users,
  children: [
    { index: true, component: UserTable },
    { path: "add-new-user", component: AddUser },
    { path: ":userId/view", component: ViewUser },
    { path: ":userId/edit", component: EditUser },
  ],
};
