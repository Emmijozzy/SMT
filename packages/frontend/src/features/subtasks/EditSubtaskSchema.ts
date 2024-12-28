import * as Yup from "yup";

export const EditSubtaskSchema = Yup.object().shape({
  subtaskId: Yup.string(),
  title: Yup.string()
    .trim()
    .required("Title is required")
    .min(5, "Title must be at least 5 charater")
    .max(50, "Title must be at most 20 charater"),
  description: Yup.string()
    .trim()
    .required("Description is required")
    .min(10, "Description must at least 10 character")
    .max(250, "Description must be at most 250 character"),
  status: Yup.string()
    .trim()
    .required("Status is required")
    .oneOf(["open", "pending", "completed"], "Invalid Task Status, status cam either be: open, pending, Completed"),
  priority: Yup.string().oneOf(["low", "medium", "high"], "priority can either be low, medium or high"),
  assignee: Yup.string().required("assignee for the subtask is required"),
  dueDate: Yup.date().required("Due Date is required"),
});
