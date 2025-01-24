import { Route } from "react-router-dom";
import RequireAdminRoute from "../features/auth/RequireAdminRoute";
import Layout from "../layout/Layout";
import { adminRouteConfig } from "./admin/routeConfig";
import renderRoutes, { RouteConfig } from "./renderRoutes";

export const AdminRoutes = (
  <Route path="/admin" element={<RequireAdminRoute />}>
    <Route element={<Layout />}>{renderRoutes(adminRouteConfig as RouteConfig[])}</Route>
  </Route>
);
