import StatusIndicator from "../../../../shared/components/StatusIndicator";
import { Status } from "../../../../shared/interface/status";

interface StatusCellProps {
  status: Status;
}

export function StatusCell({ status }: StatusCellProps) {
  return (
    <div className="flex gap-2 items-center">
      <StatusIndicator status={status} />
      <p className="capitalize">{status.replace("_", " ")}</p>
    </div>
  );
}
