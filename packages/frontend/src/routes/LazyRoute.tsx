import { ReactNode } from "react";
import { LazyComponent2 } from "./LazyWrapper2";

interface LazyRouteProps {
  children: ReactNode;
}

export function LazyRoute({ children }: LazyRouteProps) {
  return <LazyComponent2>{children}</LazyComponent2>;
}
