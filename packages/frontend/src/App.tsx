import { Routes, Route } from "react-router-dom";
import Home from "./features/General/Home";
import Layout from "./layout/Layout";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Dashboard from "./features/Dashboard/Dashboard";
import Tasks from "./features/tasks/Tasks";
import Teams from "./features/teams/Teams";
import Users from "./features/users/Users";
import Prefetch from "./features/auth/Prefetch";
import RequireAuth from "./features/auth/RequireAuth";
import RequireAdminRoute from "./features/auth/RequireAdminRoute";
import RequireData from "./features/auth/RequireData";
import Profile from "./features/profile/Profile";
import UserTable from "./features/users/UserTable/UserTable";
import AddUser from "./features/users/AddUser/AddUser";
import ViewUser from "./features/users/viewUser/ViewUser";
import EditUser from "./features/users/EditUser/EditUser";
import TasksTable from "./features/tasks/TasksTable/TaskTable";
import CreateTask from "./features/tasks/createTask/CreateTask";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Prefetch />}>
        <Route element={<RequireData />}>
          <Route element={<RequireAuth />}>
            {/* Admin Start */}
            <Route element={<RequireAdminRoute />}>
              <Route path="/dash" element={<Layout />}>
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
                </Route>
                <Route path="teams" element={<Teams />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Route>
            {/* Admin End */}
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
