import { ComponentType } from "react";
import { Route } from "react-router-dom";
import RequireAdminRoute from "../features/auth/RequireAdminRoute";
import Layout from "../layout/Layout";
import { LazyRoute } from "./LazyRoute";
import { adminRouteConfig } from "./admin/routeConfig";

interface RouteConfig {
  path: string;
  component: ComponentType;
  children?: RouteConfig[];
  index?: boolean;
}

const renderRoutes = (routes: RouteConfig[]) =>
  routes.map(({ path, component: Component, children, index }) => {
    const element = (
      <LazyRoute>
        <Component />
      </LazyRoute>
    );

    if (children) {
      return (
        <Route key={path} path={path} element={element}>
          {renderRoutes(children)}
        </Route>
      );
    }

    return <Route key={path || "index"} path={!index ? path : undefined} index={index} element={element} />;
  });

export const AdminRoutes = (
  <Route path="/admin" element={<RequireAdminRoute />}>
    <Route element={<Layout />}>{renderRoutes(adminRouteConfig as RouteConfig[])}</Route>
  </Route>
);
