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

export type CheckList = {
  id: string;
  checkItem: string;
  isChecked: boolean;
  isApprove: boolean;
  isReject: boolean;
};

export type RequiredField = {
  id: string;
  field: string;
  input: string;
  type: "text" | "link";
};

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

export interface SubtaskLog {
  id: string;
  subtaskId: string;
  timestamp: Date;
  action: string;
  actor: {
    userId: string;
    name: string;
    role: string;
  };
  details?: {
    requiredFields?: RequiredField[];
    checklist?: CheckList[];
    feedback?: string;
    comment?: string;
    decision?: string;
  };
}
