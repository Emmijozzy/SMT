import { useState } from "react";
import { CheckLists } from "../useAddSubtask";
import { ChecklistInput } from "./ChecklistInput";
import { ChecklistItems } from "./ChecklistItems";

type Props = {
  checklists: CheckLists;
  onRemove: (id: string) => void;
  onAdd: (checklist: CheckLists[number]) => void;
};

export function ChecklistSection({ checklists, onRemove, onAdd }: Props) {
  const [checklist, setChecklist] = useState("");

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="border-b-[1px] border-base-content/40">
        <h6 className="h6 font-medium">Subtask Checklists</h6>
      </div>
      <ChecklistItems checklists={checklists} onRemove={onRemove} />
      <ChecklistInput
        value={checklist}
        onChange={setChecklist}
        onAdd={() => {
          onAdd({
            id: `check_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            checkItem: checklist,
            isChecked: false,
            isApprove: false,
            isReject: false,
          });
          setChecklist("");
        }}
      />
    </div>
  );
}
