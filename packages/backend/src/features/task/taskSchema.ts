import * as Yup from "yup";

const userProfileUpdateSchema = Yup.object().shape({
  email: Yup.string().email().trim().optional(),
  phoneNo: Yup.string().trim().required("Phone number is required").phone([], "phone number be valid"),
  location: Yup.string().trim().required().min(2, "Location can not be less than 2"),
  whatsappLink: Yup.string().trim().url().optional(),
  facebookLink: Yup.string().trim().url().optional(),
  linkedInLink: Yup.string().trim().url().optional()
});

const taskSchema = Yup.object().shape({
  taskId: Yup.string(),
  title: Yup.string()
    .trim()
    .required("Title is required")
    .min(5, "Title must be at least 5 charater")
    .max(20, "Title must be at most 20 charater"),
  description: Yup.string()
    .trim()
    .required("Description is required")
    .min(10, "Description must at least 10 character")
    .max(250, "Description must be at most 250 character"),
  assignedTo: Yup.array().of(Yup.string().trim()),
  responsibleTeam: Yup.string()
    .trim()
    .when("managerTask", (managerTask, schema) => {
      const manTask = managerTask as unknown as boolean;
      return manTask !== true ? schema.required("Team is required") : schema.notRequired();
    }),
  status: Yup.string()
    .trim()
    .required("Status is required")
    .oneOf(
      ["Not Started", "In Progress", "Completed", "Closed"],
      "Invalid Task Status, status cam either be: Not Started, In Progress, Completed or Closed"
    ),
  managerTask: Yup.boolean(),
  managerId: Yup.string().when("managerTask", (managerTask, schema) => {
    const manTask = managerTask as unknown as boolean;
    return manTask == true ? schema.required("Manager Id is required") : schema.notRequired();
  }),
  priority: Yup.string().oneOf(["low", "medium", "high"], "priority can either be low, medium or high"),
  dueDate: Yup.date(),
  createdAt: Yup.date(),
  updatedAt: Yup.date(),
  del_flg: Yup.boolean(),
  subTasks: Yup.array().of(Yup.string().trim())
});

export default taskSchema;