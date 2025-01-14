import { useState } from "react";

export const useCommentState = (initialComment: string) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editedComment, setEditedComment] = useState(initialComment);

  return {
    showEdit,
    setShowEdit,
    showDeleteModal,
    setShowDeleteModal,
    editedComment,
    setEditedComment,
  };
};
