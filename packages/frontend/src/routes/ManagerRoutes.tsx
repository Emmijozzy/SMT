import { lazy } from "react";
import { Route } from "react-router-dom";
import RequireManagerRoute from "../features/auth/RequireManagerRoute";
import AddUser from "../features/users/AddUser/AddUser";
import Users from "../features/users/Users";
import ViewUser from "../features/users/viewUser/ViewUser";
import Layout from "../layout/Layout";
import { LazyComponent2 } from "./LazyWrapper2";

const Dashboard = lazy(() => import("../features/Dashboard/Dashboard"));
const MemberTable = lazy(() => import("../features/users/manager/MemberTable"));
const Tasks = lazy(() => import("../features/tasks/Tasks"));
// const TasksTable = lazy(() => import("../features/tasks/TasksTable/TaskTable"));
const ManagerTaskTable = lazy(() => import("../features/tasks/manager/ManagerTaskTable"));

export const ManagerRoutes = (
  <Route path="manager" element={<RequireManagerRoute />}>
    <Route path="dash" element={<Layout />}>
      <Route
        index
        element={
          <LazyComponent2>
            <Dashboard />
          </LazyComponent2>
        }
      />
      <Route
        path="users"
        element={
          <LazyComponent2>
            <Users />
          </LazyComponent2>
        }
      >
        <Route
          index
          element={
            <LazyComponent2>
              <MemberTable />
            </LazyComponent2>
          }
        />
        <Route
          path=":userId/view"
          element={
            <LazyComponent2>
              <ViewUser />
            </LazyComponent2>
          }
        />
        <Route
          path="add-new-user"
          element={
            <LazyComponent2>
              <AddUser />
            </LazyComponent2>
          }
        />
      </Route>
      <Route
        path="tasks"
        element={
          <LazyComponent2>
            <Tasks />
          </LazyComponent2>
        }
      >
        <Route
          index
          element={
            <LazyComponent2>
              <ManagerTaskTable />
            </LazyComponent2>
          }
        />
      </Route>
    </Route>
  </Route>
);
