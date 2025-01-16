import LoadingSpinner from "../../../shared/components/LoadingSpinner";

export function LoadingState() {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoadingSpinner />
    </div>
  );
}
