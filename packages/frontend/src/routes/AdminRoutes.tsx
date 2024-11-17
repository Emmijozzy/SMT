import { lazy } from "react";
import { Route } from "react-router-dom";
import RequireAdminRoute from "../features/auth/RequireAdminRoute";
import Layout from "../layout/Layout";
import { LazyComponent } from "./LazyWrapper";

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
          <LazyComponent>
            <Dashboard />
          </LazyComponent>
        }
      />
      <Route
        path="users"
        element={
          <LazyComponent>
            <Users />
          </LazyComponent>
        }
      >
        <Route
          index
          element={
            <LazyComponent>
              <UserTable />
            </LazyComponent>
          }
        />
        <Route
          path="add-new-user"
          element={
            <LazyComponent>
              <AddUser />
            </LazyComponent>
          }
        />
        <Route
          path=":userId/view"
          element={
            <LazyComponent>
              <ViewUser />
            </LazyComponent>
          }
        />
        <Route
          path=":userId/edit"
          element={
            <LazyComponent>
              <EditUser />
            </LazyComponent>
          }
        />
      </Route>
      <Route
        path="tasks"
        element={
          <LazyComponent>
            <Tasks />
          </LazyComponent>
        }
      >
        <Route
          index
          element={
            <LazyComponent>
              <TasksTable />
            </LazyComponent>
          }
        />
        <Route
          path="create_task"
          element={
            <LazyComponent>
              <CreateTask />
            </LazyComponent>
          }
        />
        <Route
          path=":taskId"
          element={
            <LazyComponent>
              <ViewTask />
            </LazyComponent>
          }
        />
      </Route>
      <Route
        path="teams"
        element={
          <LazyComponent>
            <Teams />
          </LazyComponent>
        }
      >
        <Route
          index
          element={
            <LazyComponent>
              <TeamTable />
            </LazyComponent>
          }
        />
        <Route
          path="create_team"
          element={
            <LazyComponent>
              <CreateTeam />
            </LazyComponent>
          }
        />
        <Route
          path=":teamId"
          element={
            <LazyComponent>
              <ViewTeam />
            </LazyComponent>
          }
        />
      </Route>
      <Route
        path="profile"
        element={
          <LazyComponent>
            <Profile />
          </LazyComponent>
        }
      />
    </Route>
  </Route>
);
