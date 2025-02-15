import * as Yup from "yup";

const createSchema = Yup.object().shape({
  subtaskId: Yup.string(),
  taskId: Yup.string().required("Task ID is required"),
  title: Yup.string()
    .trim()
    .required("Title is required")
    .min(5, "Title must be at least 5 character")
    .max(50, "Title must be at most 50 character"),
  description: Yup.string()
    .trim()
    .required("Description is required")
    .min(10, "Description must at least 10 character")
    .max(250, "Description must be at most 250 character"),
  status: Yup.string()
    .trim()
    .oneOf(
      ["open", "in_progress", "in_review", "revisit", "completed"],
      "Invalid Task Status, status cam either be: Open, In Progress, Completed or Closed"
    ),
  checkLists: Yup.array().of(
    Yup.object()
      .shape({
        id: Yup.string().trim(),
        checkItem: Yup.string().trim(),
        isChecked: Yup.boolean(),
        isApprove: Yup.boolean(),
        isReject: Yup.boolean()
      })
      .test("not-both-approve-reject", "Cannot be both approved and rejected", function (value) {
        return !(value.isApprove && value.isReject);
      })
  ),
  requiredFields: Yup.array().of(
    Yup.object().shape({
      id: Yup.string().trim(),
      field: Yup.string().trim(),
      value: Yup.string().trim(),
      type: Yup.string().trim().oneOf(["text", "link"], "Invalid Task Status, status cam either be: text or link")
    })
  ),
  priority: Yup.string().oneOf(["low", "medium", "high"], "priority can either be low, medium or high"),
  dueDate: Yup.date().required(),
  assignee: Yup.string().trim(),
  team: Yup.string().trim().required("Team is required")
});

const updateSchema = Yup.object().shape({
  subtaskId: Yup.string().required("Subtask ID is required"),
  taskId: Yup.string().required("Task ID is required"),
  title: Yup.string()
    .trim()
    .required("Title is required")
    .min(5, "Title must be at least 5 character")
    .max(50, "Title must be at most 50 character"),
  team: Yup.string().trim().required("Team is required"),
  description: Yup.string()
    .trim()
    .required("Description is required")
    .min(10, "Description must at least 10 character")
    .max(250, "Description must be at most 250 character"),
  status: Yup.string()
    .trim()
    .oneOf(
      ["open", "in_progress", "in_review", "revisit", "completed"],
      "Invalid Task Status, status cam either be: Open, In Progress, Completed or Closed"
    )
    .required("Status is required"),
  checkLists: Yup.array().of(
    Yup.object()
      .shape({
        id: Yup.string().trim(),
        checkItem: Yup.string().trim(),
        isChecked: Yup.boolean(),
        isApprove: Yup.boolean(),
        isReject: Yup.boolean()
      })
      .test("not-both-approve-reject", "Cannot be both approved and rejected", function (value) {
        return !(value.isApprove && value.isReject);
      })
  ),
  requiredFields: Yup.array().of(
    Yup.object().shape({
      id: Yup.string().trim(),
      field: Yup.string().trim(),
      value: Yup.string().trim(),
      type: Yup.string().trim().oneOf(["text", "link"], "Invalid Task Status, status cam either be: text or link")
    })
  ),
  priority: Yup.string()
    .oneOf(["low", "medium", "high"], "priority can either be low, medium or high")
    .required("Priority is required"),
  dueDate: Yup.date().required(),
  assignee: Yup.string().trim().required("Assignee is required"),
  comments: Yup.array().of(Yup.string()).optional(),
  collaborators: Yup.array().of(Yup.string()).optional()
});

const InReviewUpdateDataSchema = Yup.object().shape({
  comment: Yup.string().required("Comment is required"),

  checkLists: Yup.array().of(
    Yup.object().shape({
      id: Yup.string().required("Checklist ID is required"),
      checkItem: Yup.string().required("Check item is required"),
      isChecked: Yup.boolean().required("isChecked is required").oneOf([true], "isChecked must be true"),
      isApprove: Yup.boolean().required("isApprove is required"),
      isReject: Yup.boolean().required("isReject is required")
    })
  ),

  requiredFields: Yup.array().of(
    Yup.object().shape({
      id: Yup.string().required("Field ID is required"),
      field: Yup.string().required("Field name is required"),
      input: Yup.string().required("Input is required"),
      // eslint-disable-next-line prettier/prettier
      type: Yup.string().required("Type is required").oneOf(["text", "link"], "Type must be either \"text\" or \"link\"")
    })
  )
});

const InReviewFeedBackDataSchema = Yup.object().shape({
  feedback: Yup.string().required("Feedback is required"),

  checkLists: Yup.array().of(
    Yup.object()
      .shape({
        id: Yup.string().required("Checklist ID is required"),
        checkItem: Yup.string().required("Check item is required"),
        isChecked: Yup.boolean().required("isChecked is required").oneOf([true], "isChecked must be true"),
        isApprove: Yup.boolean().required("isApprove is required"),
        isReject: Yup.boolean().required("isReject is required")
      })
      .test("approve-reject-validation", "isApprove and isReject cannot both be true", function (value) {
        return !(value.isApprove && value.isReject); // Ensure both are not true
      })
  ),

  requiredFields: Yup.array().of(
    Yup.object().shape({
      id: Yup.string().required("Field ID is required"),
      field: Yup.string().required("Field name is required"),
      input: Yup.string().required("Input is required"),
      // eslint-disable-next-line prettier/prettier
      type: Yup.string().required("Type is required").oneOf(["text", "link"], "Type must be either \"text\" or \"link\"")
    })
  )
});

export default {
  createSchema,
  updateSchema,
  InReviewUpdateDataSchema,
  InReviewFeedBackDataSchema
};
