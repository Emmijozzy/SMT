import { memo } from "react";
import EditSubtaskDetails from "../../editSubtaskDetails/EditSubtaskDetails";
import ViewSubtaskDetails from "../../ViewSubtaskDetails";

interface SubtaskViewProps {
  showEdit: boolean;
  setShowEdit: (show: boolean) => void;
  setShowDeleteModal: (show: boolean) => void;
}

const SubtaskView = memo(({ showEdit, setShowEdit, setShowDeleteModal }: SubtaskViewProps) =>
  showEdit ? (
    <EditSubtaskDetails showEdit={() => setShowEdit(false)} />
  ) : (
    <ViewSubtaskDetails showDeleteModal={() => setShowDeleteModal(true)} showEdit={() => setShowEdit(true)} />
  ),
);

export default SubtaskView;
