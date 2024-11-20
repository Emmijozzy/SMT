import { ReactNode, Suspense } from "react";

export function Loader({ transparent }: { transparent: boolean }) {
  return (
    <div className={`${transparent ? "bg-transparent" : "bg-base-200"}`}>
      <div className="flex justify-center items-center h-screen">
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-transparent text-primary text-4xl animate-spin flex items-center justify-center border-t-primary rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-secondary text-2xl animate-spin flex items-center justify-center border-t-secondary rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function LazyComponent2({ children }: { children: ReactNode }) {
  return <Suspense fallback={<Loader transparent={false} />}>{children}</Suspense>;
}
