import { useState } from "react";
import DeleteSubtaskModal from "../deleteSubtask/DeleteSubtaskModal";
import SubtaskAuditLog from "./components/SubtaskAuditLog";
import SubtaskView from "./components/SubtaskView";

function ViewSubtask() {
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <SubtaskView showEdit={showEdit} setShowEdit={setShowEdit} setShowDeleteModal={setShowDeleteModal} />

      <SubtaskAuditLog />

      {showDeleteModal && <DeleteSubtaskModal onClose={() => setShowDeleteModal(false)} />}
    </>
  );
}

export default ViewSubtask;
