import { ReactNode, Suspense } from "react";
import Loader from "../features/loading/Loader";

export function LazyComponent({ children }: { children: ReactNode }) {
  return <Suspense fallback={<Loader isLoading transparent={false} />}>{children}</Suspense>;
}
