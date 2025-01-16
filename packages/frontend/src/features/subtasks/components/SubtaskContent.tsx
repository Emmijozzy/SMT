import { memo } from "react";
import DetailsContainer from "../../../shared/components/DetailsContainer";
import { ISubtask } from "../subtaskInterface";
import { SubtaskHeader } from "./SubtaskHeader";
import { useSubtaskTableRows } from "./SubtaskTableRows";

interface SubtaskContentProps {
  subtask: ISubtask;
  role: string;
  showEdit: () => void;
  showDeleteModal: () => void;
}

export const SubtaskContent = memo(({ subtask, role, showEdit, showDeleteModal }: SubtaskContentProps) => {
  const tableRows = useSubtaskTableRows(subtask);

  return (
    <div className="container transition-all">
      <div className="w-full flex flex-col bg-base-200 rounded-lg shadow-md">
        <SubtaskHeader role={role} showEdit={showEdit} showDeleteModal={showDeleteModal} />
        <DetailsContainer tableRows={tableRows} />
      </div>
    </div>
  );
});
