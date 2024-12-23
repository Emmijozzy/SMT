import * as Yup from "yup";

const addSubtaskSchema = Yup.object().shape({
  taskId: Yup.string().required("Task Id is required"),
  team: Yup.string().required("Team is required"),
  title: Yup.string()
    .trim()
    .required("Title is required")
    .min(5, "Title must be at least 5 charater")
    .max(20, "Title must be at most 20 charater"),
  description: Yup.string()
    .trim()
    .required("Description is required")
    .min(10, "Description must at least 10 character")
    .max(500, "Description must be at most 250 character"),
  // status: Yup.string().oneOf(["open", "pending", "complete"]),
  priority: Yup.string().oneOf(["low", "medium", "high"]),
  assignee: Yup.string().required("Assignee is required"),
  dueDate: Yup.date().required("Due Date is required"),
});

export default addSubtaskSchema;
