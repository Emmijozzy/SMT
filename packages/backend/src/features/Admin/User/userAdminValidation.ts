import * as Yup from "yup";
import YupPassword from "yup-password";
import "yup-phone-lite";

YupPassword(Yup);

const firstNameSchema = Yup.string()
  .trim()
  .required("First Name is required")
  .min(2, "First Name must be at least 2 characters long")
  .max(30, "First Name must be less than or equal to 30 characters long")
  .matches(/^[a-zA-Z]+$/, "First Name can only contain letters");

const lastNameSchema = Yup.string()
  .trim()
  .required("Last Name is required")
  .min(2, "Last Name must be at least 2 characters long")
  .max(30, "Last Name must be less than or equal to 30 characters long")
  .matches(/^[a-zA-Z]+$/, "Last Name can only contain letters");

const emailSchema = Yup.string().trim().required("Email is required").email("Please enter a valid email address");

const passwordSchema = Yup.string().required("Password is required").password();

const confirmPasswordSchema = Yup.string()
  .required("Confirm Password is required")
  .oneOf([Yup.ref("password")], "Confirm Password does not match your password");

const phoneSchema = Yup.string()
  .trim()
  .required("Phone number is required")
  .phone([], "phone number be valid")
  .matches(/^\+/, "Phone number must start with +");

const roleSchema = Yup.string()
  .required("Role is required")
  .oneOf(["admin", "manager", "team_member"], "Invalid role. Please select admin, manager, or team member.");

export const userAdminSchema = Yup.object().shape({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
  phoneNo: phoneSchema,
  role: roleSchema,
  team: Yup.string().trim().required(),
  location: Yup.string().trim().required().min(2, "Location can not be less than 2").required("Location is required."),
  whatsappLink: Yup.string().trim().url().optional(),
  facebookLink: Yup.string().trim().url().optional(),
  linkedInLink: Yup.string().trim().url().optional(),
  canCreateTasks: Yup.boolean(),
  canEditTasks: Yup.boolean(),
  canDeleteTasks: Yup.boolean(),
  canViewReports: Yup.boolean(),
  canAddSubtasks: Yup.boolean(),
  canReassignTasks: Yup.boolean(),
  canEditUsers: Yup.boolean(),
  canAssignRole: Yup.boolean(),
  canDeleteUsers: Yup.boolean(),
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema
});

export const userUpdateAdminSchema = Yup.object().shape({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
  phoneNo: phoneSchema,
  role: roleSchema,
  team: Yup.string().trim().required(),
  location: Yup.string().trim().required().min(2, "Location can not be less than 2").required("Location is required."),
  whatsappLink: Yup.string().trim().url().optional(),
  facebookLink: Yup.string().trim().url().optional(),
  linkedInLink: Yup.string().trim().url().optional(),
  canCreateTasks: Yup.boolean(),
  canEditTasks: Yup.boolean(),
  canDeleteTasks: Yup.boolean(),
  canViewReports: Yup.boolean(),
  canAddSubtasks: Yup.boolean(),
  canReassignTasks: Yup.boolean(),
  canEditUsers: Yup.boolean(),
  canAssignRole: Yup.boolean(),
  canDeleteUsers: Yup.boolean(),
  password: Yup.string(),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Confirm Password does not match your password")
});
