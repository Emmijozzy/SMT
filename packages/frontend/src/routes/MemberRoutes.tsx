import { Route } from "react-router-dom";
import RequireMemberRoute from "../features/auth/RequireMemberRoute";
import Layout from "../layout/Layout";
import renderRoutes, { RouteConfig } from "./renderRoutes";
import { memberRouteConfig } from "./member/routeConfig";

export const MemberRoutes = (
  <Route path="team_member" element={<RequireMemberRoute />}>
    <Route element={<Layout />}>{renderRoutes(memberRouteConfig as RouteConfig[])}</Route>
  </Route>
);
