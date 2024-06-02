import * as Yup from "yup";

export const profileUpdateSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required("First Name is required.")
    .min(2, "First Name must be at least 2 characters long.")
    .max(30, "First Name must be less than or equal to 30 characters long."),
  lastName: Yup.string()
    .trim()
    .required("Last Name is required.")
    .min(2, "Last Name must be at least 2 characters long.")
    .max(30, "Last Name must be less than or equal to 30 characters long."),

  password: Yup.string().password().required(),

  confirmPassword: Yup.string()
    .required("Confirm Password is required.")
    .oneOf([Yup.ref("password")], "Confirm Password does not match your password."),
  email: Yup.string().trim().required("Email is required.").email("Please enter a valid email address."),
});
