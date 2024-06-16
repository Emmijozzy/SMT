import * as Yup from "yup";
import YupPassword from "yup-password";
import "yup-phone-lite";

YupPassword(Yup);

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
    .required("Confirm Passwsord is required.")
    .oneOf([Yup.ref("password")], "Confirm Password does not match your password."),
  email: Yup.string().trim().required("Email is required.").email("Please enter a valid email address."),
});

export const userProfileUpdateSchema = Yup.object().shape({
  email: Yup.string().email().trim().required("Email is required."),
  phone: Yup.string()
    .trim()
    .required("Phone number is required")
    .phone([], "phone number be valid")
    .matches(/^\+/, "Phone number must start with +"),
  location: Yup.string().trim().required().min(2, "Location can not be less than 2").required("Location is required."),
  whatsappLink: Yup.string().trim().url().optional(),
  facebookLink: Yup.string().trim().url().optional(),
  linkedInLink: Yup.string().trim().url().optional(),
});
