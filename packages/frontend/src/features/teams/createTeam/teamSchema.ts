import * as Yup from "yup";

const teamSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Team Name is required")
    .min(5, "Team Name must be at least 5 charater")
    .max(20, "Team Name must be at most 20 charater"),
  description: Yup.string()
    .trim()
    .required("Description is required")
    .min(10, "Description must at least 10 character")
    .max(250, "Description must be at most 250 character"),
  managerId: Yup.string().required("Manager Id is required"),
  tasks: Yup.array().of(Yup.string().trim()),
  subTasks: Yup.array().of(Yup.string().trim()),
});

export default teamSchema;
