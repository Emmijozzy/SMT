import { ChecklistItems } from "../../addSubtask/components/ChecklistItems";
import { CheckLists } from "../../addSubtask/useAddSubtask";
import { SubtaskStatus } from "../../SubtaskStatus";

type Props = {
  checklistItems: CheckLists;
  onChecklistChange: (id: string, action: string, checked: boolean) => void;
  subtaskStatus: SubtaskStatus;
};

function CheckListSection({ checklistItems, onChecklistChange, subtaskStatus }: Props) {
  if (!checklistItems || checklistItems.length === 0) return null;
  return (
    <div className="w-full bg-base-200 p-1 rounded-lg shadow-sm">
      <h6 className="text-xl font-semibold mb-2 mx-2">Checklists</h6>
      <ChecklistItems checklists={checklistItems} onChecklistChange={onChecklistChange} subtaskStatus={subtaskStatus} />
    </div>
  );
}
export default CheckListSection;
