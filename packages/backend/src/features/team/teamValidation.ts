import * as Yup from "yup";

const teamSchema = Yup.object().shape({
  teamId: Yup.string().optional(), // Unique team identifier (automatically generated)
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  members: Yup.array().of(Yup.string()).optional(), // Array of members (optional)
  managerId: Yup.string().optional(), // Manager ID (optional)
  tasks: Yup.array().of(Yup.string()).optional(), // Array of task IDs (optional)
  subTasks: Yup.array().of(Yup.string()).optional(), // Array of sub-task IDs (optional)
  createdAt: Yup.date().optional(), // Created date (optional)
  updatedAt: Yup.date().optional() // Updated date (optional)
});

export default {
  teamSchema
};
