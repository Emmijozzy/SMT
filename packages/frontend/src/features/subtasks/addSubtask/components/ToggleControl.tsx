/* eslint-disable indent */
import useRole from "../../../users/hooks/useRole";
import { UserRole } from "../../../users/userRole";
import { SubtaskStatus } from "../../SubtaskStatus";

type ToggleControlProps = {
  id: string;
  label: string;
  className?: string;
  value: boolean;
  subtaskStatus?: SubtaskStatus;
  onToggle?: (id: string, action: string, checked: boolean) => void;
};

export function ToggleControl({
  id,
  label,
  className = "",
  subtaskStatus = SubtaskStatus.Open,
  onToggle = () => {},
  value,
}: ToggleControlProps) {
  const role = useRole();
  if (role === undefined) return null;

  const labelLower = label.toLowerCase();
  const isTeamMember = role === UserRole.TeamMember;
  const isCheckLabel = labelLower === "check";

  const isDisabled = isTeamMember
    ? subtaskStatus !== SubtaskStatus.InProcess && subtaskStatus !== SubtaskStatus.Revisit
    : subtaskStatus === SubtaskStatus.Open || subtaskStatus === SubtaskStatus.InProcess || isCheckLabel;

  const allDisabledOnRevisit =
    (subtaskStatus === SubtaskStatus.Revisit || subtaskStatus === SubtaskStatus.Completed) && !isTeamMember;

  if (isTeamMember && !isCheckLabel) return null;

  return (
    <div className="flex flex-col items-center gap-1">
      <label htmlFor={id} className="text-xs sm:text-sm text-base-content/70">
        {label}
      </label>
      <input
        id={id}
        type="checkbox"
        defaultChecked={value}
        disabled={isDisabled || allDisabledOnRevisit}
        className={`toggle toggle-xs sm:toggle-sm ${className}`}
        onClick={(e) => onToggle(id, label, e.currentTarget.checked)}
      />
    </div>
  );
}

ToggleControl.defaultProps = {
  className: "",
  subtaskStatus: SubtaskStatus.Open,
  onToggle: () => {},
};
