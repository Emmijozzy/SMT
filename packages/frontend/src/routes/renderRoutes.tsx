import { ComponentType } from "react";
import { Route } from "react-router-dom";
import { LazyRoute } from "./LazyRoute";

export interface RouteConfig {
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

export default renderRoutes;
