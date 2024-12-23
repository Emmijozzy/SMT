import { ComponentType } from "react";
import { Route } from "react-router-dom";
import RequireManagerRoute from "../features/auth/RequireManagerRoute";
import Layout from "../layout/Layout";
import { LazyRoute } from "./LazyRoute";
import { managerRouteConfig } from "./manager/routeConfig";

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

export const ManagerRoutes = (
  <Route path="manager" element={<RequireManagerRoute />}>
    <Route element={<Layout />}>{renderRoutes(managerRouteConfig as RouteConfig[])}</Route>
  </Route>
);
