import * as Yup from "yup";
import YupPassword from "yup-password";
import "yup-phone-lite";

YupPassword(Yup);

const userProfileUpdateSchema = Yup.object().shape({
  email: Yup.string().email().trim().optional(),
  phoneNo: Yup.string().trim().required("Phone number is required").phone([], "phone number be valid"),
  location: Yup.string().trim().required().min(2, "Location can not be less than 2"),
  whatsappLink: Yup.string().trim().url().optional(),
  facebookLink: Yup.string().trim().url().optional(),
  linkedInLink: Yup.string().trim().url().optional()
});

const changedPasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().trim().required("Old password is required"),
  newPassword: Yup.string().trim().required("New password is required").password(),
  confirmPassword: Yup.string()
    .trim()
    .required("Confirm password is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
});

export default {
  userProfileUpdateSchema,
  changedPasswordSchema
};
