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
      ["not started", "completed", "closed"],
      "Invalid Task Status, status cam either be: Not Started, In Progress, Completed or Closed"
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
      ["not started", "completed", "closed"],
      "Invalid Task Status, status cam either be: Not Started, In Progress, Completed or Closed"
    )
    .required("Status is required"),
  priority: Yup.string()
    .oneOf(["low", "medium", "high"], "priority can either be low, medium or high")
    .required("Priority is required"),
  dueDate: Yup.date().required(),
  assignee: Yup.string().trim().required("Assignee is required"),
  comments: Yup.array().of(Yup.string()).optional(),
  collaborators: Yup.array().of(Yup.string()).optional()
});

export default {
  createSchema,
  updateSchema
};
