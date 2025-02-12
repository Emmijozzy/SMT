import { SubtaskStatus } from "../../SubtaskStatus";
import { ToggleControl } from "./ToggleControl";

type ChecklistControlsProps = {
  id: string;
  subtaskStatus?: SubtaskStatus;
  onChecklistChange?: (id: string, action: string, checked: boolean) => void;
  isChecked: boolean;
  isApproved: boolean;
  isRejected: boolean;
};

export function ChecklistControls({
  id,
  subtaskStatus,
  onChecklistChange,
  isApproved,
  isChecked,
  isRejected,
}: ChecklistControlsProps) {
  return (
    <div className="flex items-center justify-end gap-4 sm:gap-6">
      <ToggleControl
        onToggle={onChecklistChange}
        subtaskStatus={subtaskStatus}
        id={id}
        label="Check"
        value={isChecked}
        className="toggle-primary"
      />
      <ToggleControl
        onToggle={onChecklistChange}
        subtaskStatus={subtaskStatus}
        id={id}
        label="Approve"
        value={isApproved}
        className="toggle-success"
      />
      <ToggleControl
        onToggle={onChecklistChange}
        subtaskStatus={subtaskStatus}
        id={id}
        value={isRejected}
        label="Reject"
        className="toggle-error"
      />
    </div>
  );
}

ChecklistControls.defaultProps = {
  subtaskStatus: SubtaskStatus.Open,
  onChecklistChange: () => {},
};
