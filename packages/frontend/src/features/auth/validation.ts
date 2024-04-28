import * as Yup from "yup";
import YupPassword from "yup-password";

YupPassword(Yup);

export const registrationSchema = Yup.object().shape({
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

export const loginSchema = Yup.object().shape({
  userId: Yup.string().min(2, "Too Short!").trim().required("User ID is Required"),
  password: Yup.string().min(2, "Too Short!").trim().required("Password Required"),
});

export default {
  registrationSchema,
  loginSchema,
};
