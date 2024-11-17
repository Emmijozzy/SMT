import { Route, Routes } from "react-router-dom";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import RequireAdminRoute from "./features/auth/RequireAdminRoute";
import RequireAuth from "./features/auth/RequireAuth";
import RequireManagerRoute from "./features/auth/RequireManagerRoute";
import RequireMemberRoute from "./features/auth/RequireMemberRoute";
import Dashboard from "./features/Dashboard/Dashboard";
import Home from "./features/General/Home";
import Profile from "./features/profile/Profile";
import CreateTask from "./features/tasks/createTask/CreateTask";
import Tasks from "./features/tasks/Tasks";
import TasksTable from "./features/tasks/TasksTable/TaskTable";
import ViewTask from "./features/tasks/viewTask/ViewTask";
import CreateTeam from "./features/teams/createTeam/CreateTeam";
import Teams from "./features/teams/Team";
import TeamTable from "./features/teams/teamTable/TeamTable";
import ViewTeam from "./features/teams/viewTeam/ViewTeam";
import AddUser from "./features/users/AddUser/AddUser";
import EditUser from "./features/users/EditUser/EditUser";
import Users from "./features/users/Users";
import UserTable from "./features/users/UserTable/UserTable";
import ViewUser from "./features/users/viewUser/ViewUser";
import Layout from "./layout/Layout";
import Prefetch from "./features/auth/Prefetch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth" element={<RequireAuth />} />
      <Route element={<Prefetch />}>
        {/* Admin Start */}
        <Route path="/admin" element={<RequireAdminRoute />}>
          <Route key="dashboard" path="dash" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />}>
              <Route index element={<UserTable />} />
              <Route path="add-new-user" element={<AddUser />} />
              <Route path=":userId/view" element={<ViewUser />} />
              <Route path=":userId/edit" element={<EditUser />} />
            </Route>
            <Route path="tasks" element={<Tasks />}>
              <Route index element={<TasksTable />} />
              <Route path="create_task" element={<CreateTask />} />
              <Route path=":taskId" element={<ViewTask />} />
            </Route>
            <Route path="teams" element={<Teams />}>
              <Route index element={<TeamTable />} />
              <Route path="create_team" element={<CreateTeam />} />
              <Route path=":teamId" element={<ViewTeam />} />
            </Route>
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
        {/* Admin End */}
        {/* Manager Start */}
        <Route path="manager" element={<RequireManagerRoute />}>
          <Route key="dashboard" path="dash" element={<Layout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Route>
        {/* Manager End */}
        {/* Team Member Start */}
        <Route path="team_member" element={<RequireMemberRoute />}>
          <Route key="dashboard" path="dash" element={<Layout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Route>
        {/* Team Member End */}
      </Route>
    </Routes>
  );
}
export default App;
