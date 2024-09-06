/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as Yup from "yup";

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
      ["not started", "in progress", "completed", "closed"],
      "Invalid Task Status, status cam either be: Not Started, In Progress, Completed or Closed",
    ),
  managerTask: Yup.boolean(),
  managerId: Yup.string().when("managerTask", (managerTask, schema) => {
    const manTask = managerTask as unknown as boolean;
    return manTask === true ? schema.required("Manager Id is required") : schema.notRequired();
  }),
  priority: Yup.string().oneOf(["low", "medium", "high"], "priority can either be low, medium or high"),
  startDate: Yup.date().required("Start Date is required"),
  dueDate: Yup.date()
    .required("Due Date is required")
    // eslint-disable-next-line func-names
    .test("is-later", "Due Date must be later than Start Date", function (dueDat) {
      const startDate = new Date(this.parent.startDate as string).getTime();
      const dueDate = new Date(dueDat).getTime();
      return dueDate > startDate;
    }),
  del_flg: Yup.boolean(),
  subTasks: Yup.array().of(Yup.string().trim()),
});

export default taskSchema;
