import { ReactElement, FC } from "react";

export interface IRoute {
  path: string;
  element: ReactElement | FC;
  children?: IRoute[];
}

export interface IProtectedRouteProps {
  element: ReactElement | FC;
}
