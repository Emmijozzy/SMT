import { lazy } from "react";
import { Route } from "react-router-dom";
import RequireMemberRoute from "../features/auth/RequireMemberRoute";
import Layout from "../layout/Layout";
import { LazyComponent } from "./LazyWrapper";

const Dashboard = lazy(() => import("../features/Dashboard/Dashboard"));

export const MemberRoutes = (
  <Route path="team_member" element={<RequireMemberRoute />}>
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
