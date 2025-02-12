export interface ISubtask {
  subtaskId: string;
  taskId: string;
  title: string;
  team: string;
  description?: string;
  status?: "open" | "not started" | "completed" | "closed" | "in_process" | "revisit" | "in_review";
  priority: "low" | "medium" | "high";
  createdBy: string;
  lastModifiedBy: string;
  checkLists?: {
    id: string;
    checkItem: string;
    isChecked: boolean;
    isApprove: boolean;
    isReject: boolean;
  }[];
  requiredFields?: {
    id: string;
    field: string;
    input: string;
    type: "text" | "link";
  }[];
  feedback: string;
  comment: string;
  assignee: string;
  comments: string[];
  collaborators: string[];
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface InReviewUpdateData {
  comment: string;
  checkLists: {
    id: string;
    checkItem: string;
    isChecked: boolean;
    isApprove: boolean;
    isReject: boolean;
  }[];
  requiredFields: {
    id: string;
    field: string;
    input: string;
    type: "text" | "link";
  }[];
}

export interface InReviewFeedBackData {
  feedback: string;
  checkLists: {
    id: string;
    checkItem: string;
    isChecked: boolean;
    isApprove: boolean;
    isReject: boolean;
  }[];
  requiredFields: {
    id: string;
    field: string;
    input: string;
    type: "text" | "link";
  }[];
}
