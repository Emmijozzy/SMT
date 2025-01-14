import StatusIndicator from "../../../tasks/TasksTable/components/StatusIndicator";

interface StatusCellProps {
  status: "open" | "not started" | "completed" | "closed" | "in progress";
}

export function StatusCell({ status }: StatusCellProps) {
  return (
    <div className="flex gap-2 items-center">
      <StatusIndicator status={status} />
      <p className="capitalize">{status}</p>
    </div>
  );
}
