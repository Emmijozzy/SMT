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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Prefetch />}>
        <Route element={<RequireAuth />}>
          <Route element={<RequireAdminRoute />}>
            <Route path="/dash" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="teams" element={<Teams />} />
              <Route path="users" element={<Users />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
