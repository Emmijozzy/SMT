import { lazy } from "react";
import { Route } from "react-router-dom";
import RequireManagerRoute from "../features/auth/RequireManagerRoute";
import Layout from "../layout/Layout";
import { LazyComponent } from "./LazyWrapper";

const Dashboard = lazy(() => import("../features/Dashboard/Dashboard"));

export const ManagerRoutes = (
  <Route path="manager" element={<RequireManagerRoute />}>
    <Route path="dash" element={<Layout />}>
      <Route
        index
        element={
          <LazyComponent>
            <Dashboard />
          </LazyComponent>
        }
      />
    </Route>
  </Route>
);
