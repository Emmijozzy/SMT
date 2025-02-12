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
