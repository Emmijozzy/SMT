import { Route } from "react-router-dom";
import RequireManagerRoute from "../features/auth/RequireManagerRoute";
import Layout from "../layout/Layout";
import { managerRouteConfig } from "./manager/routeConfig";
import renderRoutes, { RouteConfig } from "./renderRoutes";

export const ManagerRoutes = (
  <Route path="manager" element={<RequireManagerRoute />}>
    <Route element={<Layout />}>{renderRoutes(managerRouteConfig as RouteConfig[])}</Route>
  </Route>
);
