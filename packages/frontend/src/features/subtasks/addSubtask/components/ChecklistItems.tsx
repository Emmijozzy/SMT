import { GiCancel } from "react-icons/gi";
import useRole from "../../../users/hooks/useRole";
import { UserRole } from "../../../users/userRole";
import { SubtaskStatus } from "../../SubtaskStatus";
import { CheckLists } from "../useAddSubtask";
import { ChecklistControls } from "./ChecklistControls";

type Props = {
  checklists: CheckLists;
  onRemove?: (id: string) => void;
  subtaskStatus?: SubtaskStatus;
  onChecklistChange?: (id: string, action: string, checked: boolean) => void;
};

export function ChecklistItems({ checklists, onRemove, subtaskStatus, onChecklistChange }: Props) {
  const role = useRole();
  if (role === undefined) return null;

  if (!checklists || checklists.length === 0) return null;

  return (
    <div className="w-full">
      {checklists.map((e) => (
        <div key={e.checkItem} className="bg-base-100 p-4 mb-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {subtaskStatus === SubtaskStatus.Open && role !== UserRole.TeamMember && (
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs sm:btn-sm btn-circle"
                    aria-label="Remove checklist item"
                    onClick={() => onRemove && onRemove(e.id)}
                  >
                    <GiCancel className="text-base-content text-sm sm:text-base" />
                  </button>
                )}
                <span className="text-sm sm:text-base break-words">{e.checkItem}</span>
              </div>
            </div>
            <ChecklistControls
              id={e.id}
              subtaskStatus={subtaskStatus}
              isChecked={e.isChecked}
              isApproved={e.isApprove}
              isRejected={e.isReject}
              onChecklistChange={onChecklistChange}
            />
          </div>
        </div>
      ))}{" "}
    </div>
  );
}

ChecklistItems.defaultProps = {
  subtaskStatus: SubtaskStatus.Open,
  onChecklistChange: () => {},
  onRemove: () => {},
};
