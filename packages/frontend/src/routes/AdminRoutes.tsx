import { lazy } from "react";
import { Route } from "react-router-dom";
import RequireAdminRoute from "../features/auth/RequireAdminRoute";
import Layout from "../layout/Layout";
import { LazyComponent2 } from "./LazyWrapper2";

const Dashboard = lazy(() => import("../features/Dashboard/Dashboard"));
const Users = lazy(() => import("../features/users/Users"));
const Tasks = lazy(() => import("../features/tasks/Tasks"));
const Teams = lazy(() => import("../features/teams/Team"));
const UserTable = lazy(() => import("../features/users/UserTable/UserTable"));
const AddUser = lazy(() => import("../features/users/AddUser/AddUser"));
const ViewUser = lazy(() => import("../features/users/viewUser/ViewUser"));
const EditUser = lazy(() => import("../features/users/EditUser/EditUser"));
const TasksTable = lazy(() => import("../features/tasks/TasksTable/TaskTable"));
const CreateTask = lazy(() => import("../features/tasks/createTask/CreateTask"));
const ViewTask = lazy(() => import("../features/tasks/viewTask/ViewTask"));
const TeamTable = lazy(() => import("../features/teams/teamTable/TeamTable"));
const CreateTeam = lazy(() => import("../features/teams/createTeam/CreateTeam"));
const ViewTeam = lazy(() => import("../features/teams/viewTeam/ViewTeam"));
const Profile = lazy(() => import("../features/profile/Profile"));

export const AdminRoutes = (
  <Route path="/admin" element={<RequireAdminRoute />}>
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
              <UserTable />
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
        <Route
          path=":userId/view"
          element={
            <LazyComponent2>
              <ViewUser />
            </LazyComponent2>
          }
        />
        <Route
          path=":userId/edit"
          element={
            <LazyComponent2>
              <EditUser />
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
              <TasksTable />
            </LazyComponent2>
          }
        />
        <Route
          path="create_task"
          element={
            <LazyComponent2>
              <CreateTask />
            </LazyComponent2>
          }
        />
        <Route
          path=":taskId"
          element={
            <LazyComponent2>
              <ViewTask />
            </LazyComponent2>
          }
        />
      </Route>
      <Route
        path="teams"
        element={
          <LazyComponent2>
            <Teams />
          </LazyComponent2>
        }
      >
        <Route
          index
          element={
            <LazyComponent2>
              <TeamTable />
            </LazyComponent2>
          }
        />
        <Route
          path="create_team"
          element={
            <LazyComponent2>
              <CreateTeam />
            </LazyComponent2>
          }
        />
        <Route
          path=":teamId"
          element={
            <LazyComponent2>
              <ViewTeam />
            </LazyComponent2>
          }
        />
      </Route>
      <Route
        path="profile"
        element={
          <LazyComponent2>
            <Profile />
          </LazyComponent2>
        }
      />
    </Route>
  </Route>
);
