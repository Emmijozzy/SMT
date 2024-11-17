import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Prefetch from "./features/auth/Prefetch";
import RequireAuth from "./features/auth/RequireAuth";
import { AdminRoutes } from "./routes/AdminRoutes";
import { LazyComponent } from "./routes/LazyWrapper";
import { ManagerRoutes } from "./routes/ManagerRoutes";
import { MemberRoutes } from "./routes/MemberRoutes";

const Login = lazy(() => import("./features/auth/Login"));
const Register = lazy(() => import("./features/auth/Register"));
const Home = lazy(() => import("./features/General/Home"));

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LazyComponent>
            <Home />
          </LazyComponent>
        }
      />
      <Route
        path="/register"
        element={
          <LazyComponent>
            <Register />
          </LazyComponent>
        }
      />
      <Route
        path="/login"
        element={
          <LazyComponent>
            <Login />
          </LazyComponent>
        }
      />
      <Route path="/auth" element={<RequireAuth />} />
      <Route element={<Prefetch />}>
        {AdminRoutes}
        {ManagerRoutes}
        {MemberRoutes}
      </Route>
    </Routes>
  );
}

export default App;
