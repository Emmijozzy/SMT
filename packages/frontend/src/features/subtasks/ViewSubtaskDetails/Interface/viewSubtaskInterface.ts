import { CheckLists, RequiredFields } from "../../addSubtask/useAddSubtask";
import { ISubtask, InReviewUpdateData, InReviewFeedBackData } from "../../subtaskInterface";

export interface ActionSectionsProps {
  subtask: ISubtask;
}

export interface ActionState {
  checklistItems: CheckLists;
  requiredFields: RequiredFields;
  feedback: string;
  comment: string;
}

export interface ActionHandlers {
  handleChecklistChange: (id: string, action: string, checked: boolean) => void;
  handleRequiredFieldChange: (id: string, value: string) => void;
  handleFeedbackChange: (feedback: string) => void;
  handleCommentChange: (comment: string) => void;
}

export interface ActionVisibility {
  supervisor: boolean;
  teamMember: boolean;
}

export interface ValidationResult {
  error: string | null;
  validateData: (data: InReviewUpdateData | InReviewFeedBackData) => void;
}
