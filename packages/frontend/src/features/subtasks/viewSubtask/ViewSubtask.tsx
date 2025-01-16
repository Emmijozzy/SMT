import { useState } from "react";
import { useParams } from "react-router-dom";
import DeleteSubtaskModal from "../deleteSubtask/DeleteSubtaskModal";
import CommentSection from "./components/CommentSection";
import SubtaskView from "./components/SubtaskView";
import { useSubtaskComments } from "./hooks/useSubtaskComments";

function ViewSubtask() {
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { subtaskId } = useParams();

  const { comments, isLoading, isSubmitting, handleAddComment, handleEditComment, handleDeleteComment } =
    useSubtaskComments(subtaskId as string);

  return (
    <>
      <SubtaskView showEdit={showEdit} setShowEdit={setShowEdit} setShowDeleteModal={setShowDeleteModal} />

      <CommentSection
        subtaskId={subtaskId as string}
        comments={comments}
        isLoading={isLoading}
        isSubmitting={isSubmitting}
        onAddComment={handleAddComment}
        onEditComment={handleEditComment}
        onDeleteComment={handleDeleteComment}
      />

      {showDeleteModal && <DeleteSubtaskModal onClose={() => setShowDeleteModal(false)} />}
    </>
  );
}

export default ViewSubtask;
