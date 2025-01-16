import { SubtaskActions } from "./SubtaskActions";

interface SubtaskHeaderProps {
  role: string;
  showEdit: () => void;
  showDeleteModal: () => void;
}

export function SubtaskHeader({ role, showEdit, showDeleteModal }: SubtaskHeaderProps) {
  return (
    <div className="w-full flex justify-between p-4">
      <h6 className="text-xl font-semibold">Details</h6>
      <SubtaskActions role={role} showEdit={showEdit} showDeleteModal={showDeleteModal} />
    </div>
  );
}
