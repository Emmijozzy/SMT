import { Routes, Route } from "react-router-dom";
import Home from "./features/General/Home";
import Layout from "./layout/Layout";
import SignIn from "./features/auth/SignIn";
import SignUp from "./features/auth/SignUp";
import Dashboard from "./features/auth/Dashboard";
import Tasks from "./features/tasks/Tasks";
import Teams from "./features/teams/Teams";
import Users from "./features/users/Users";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/singin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/dash" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="teams" element={<Teams />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;
