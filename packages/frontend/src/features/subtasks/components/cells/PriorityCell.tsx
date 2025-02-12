import PriorityIndicator from "../../../../shared/components/PriorityIndicator";

interface PriorityCellProps {
  priority: string;
}

export function PriorityCell({ priority }: PriorityCellProps) {
  return (
    <div className="flex gap-1 items-center">
      <PriorityIndicator priority={priority} />
      <p className="capitalize">{priority}</p>
    </div>
  );
}
