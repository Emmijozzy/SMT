import { lazy } from "react";
import { Route } from "react-router-dom";
import RequireManagerRoute from "../features/auth/RequireManagerRoute";
import Layout from "../layout/Layout";
import { LazyComponent2 } from "./LazyWrapper2";

const Dashboard = lazy(() => import("../features/Dashboard/Dashboard"));

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
    </Route>
  </Route>
);
