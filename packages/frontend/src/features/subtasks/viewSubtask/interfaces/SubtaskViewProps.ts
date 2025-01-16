import { CommentData, CommentType } from "../../../Comment/commentInterface";

export interface SubtaskViewProps {
  showEdit: boolean;
  setShowEdit: (show: boolean) => void;
  showDeleteModal: boolean;
  setShowDeleteModal: (show: boolean) => void;
}

export interface CommentSectionProps {
  subtaskId: string;
  comments: CommentType[];
  isLoading: boolean;
  isSubmitting: boolean;
  onAddComment: (data: CommentData) => Promise<void>;
  onEditComment: (data: CommentData) => Promise<void>;
  onDeleteComment: (id: string) => Promise<void>;
}
