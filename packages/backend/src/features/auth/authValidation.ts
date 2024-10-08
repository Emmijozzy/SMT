/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable indent */
// import * as Joi from "joi";

// const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[A-Za-z@$!%*#?&^_-])[A-Za-z\d@$!%*#?&^_-]{8,}$/);
// const passwordMinLength = 8; // Define minimum password length
// const errorMessage =
//   "Password does not meet complexity requirements (minimum 8 characters, at least 1 letter, 1 number and 1 special character).";

// const validatePassword = (value: any, helpers: any) => {
//   if (value.length < passwordMinLength || !passwordRegex.test(value)) {
//     return helpers.error("password complexity");
//   }
//   return value;
// };

// const passwordSchema = Joi.string()
//   .min(passwordMinLength)
//   .pattern(passwordRegex)
//   .custom(validatePassword, "password complexity")
//   .required()
//   .error((errors) => {
//     errors.forEach((error) => {
//       switch (error.code) {
//         case "any.required":
//           throw new Error("Password is required.");
//           break;
//         case "string.min":
//           throw new Error("Password must be at least 8 characters long");
//           break;
//         case "string.pattern.base":
//           throw new Error(
//             "Password must contain a lowercase letter, an uppercase letter, a number, and a special symbol."
//           );
//           break;
//         case "password complexity":
//           throw new Error(errorMessage);
//           break;
//         default:
//           throw new Error(errorMessage);
//           break;
//       }
//     });
//     return errors;
//   });

// const confirmPasswordSchema = Joi.string()
//   .required()
//   .valid(Joi.ref("password"))
//   .error((errors) => {
//     errors.forEach((error) => {
//       switch (error.code) {
//         case "any.required":
//           throw new Error("Confirm Password is required.");
//           break;
//         default:
//           throw new Error("Confirm Password does not match your password.");
//           break;
//       }
//     });
//     return errors;
//   });

// const firstNameSchema = Joi.string()
//   .trim()
//   .required()
//   .min(2)
//   .max(30)
//   .pattern(/^[a-zA-Z]+$/)
//   .error((errors) => {
//     errors.forEach((error) => {
//       switch (error.code) {
//         case "any.required":
//           throw new Error("First Name is required.");
//           break;
//         case "string.min":
//           throw new Error("First Name must be at least 2 characters long.");
//           break;
//         case "string.max":
//           throw new Error("First Name must be less than or equal to 30 characters long.");
//           break;
//         case "string.pattern.base":
//           throw new Error("First Name can only contain letters.");
//           break;
//         default:
//           break;
//       }
//     });
//     return errors;
//   });

// const lastNameSchema = Joi.string()
//   .trim()
//   .required()
//   .min(2)
//   .max(30)
//   .pattern(/^[a-zA-Z]+$/)
//   .error((errors) => {
//     errors.forEach((error) => {
//       switch (error.code) {
//         case "any.required":
//           throw new Error("Last Name is required.");
//           break;
//         case "string.min":
//           throw new Error("Last Name must be at least 2 characters long.");
//           break;
//         case "string.max":
//           throw new Error("Last Name must be less than or equal to 30 characters long.");
//           break;
//         case "string.pattern.base":
//           throw new Error("Last Name can only contain letters.");
//           break;
//         default:
//           break;
//       }
//     });
//     return errors;
//   });

// const emailSchema = Joi.string()
//   .trim()
//   .required()
//   .email()
//   .error((errors) => {
//     errors.forEach((error) => {
//       switch (error.code) {
//         case "any.required":
//           throw new Error("Email is required.");
//           break;
//         case "string.email":
//           throw new Error("Please enter a valid email address.");
//           break;
//         default:
//           break;
//       }
//     });
//     return errors;
//   });

// export const registrationSchema = Joi.object({
//   firstName: firstNameSchema,
//   lastName: lastNameSchema, // Existing validation
//   password: passwordSchema,
//   confirmPassword: confirmPasswordSchema,
//   email: emailSchema
// });

// export const loginSchema = Joi.object({
//   userId: Joi.string()
//     .trim()
//     .required()
//     .error(() => new Error("User ID is required")),

//   password: Joi.string()
//     .required()
//     .error(() => new Error("Password is required"))
// });

// export default {
//   registrationSchema,
//   loginSchema
// };

import * as Yup from "yup";
import YupPassword from "yup-password";

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

const registrationSchema = Yup.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
  email: emailSchema
});

const loginSchema = Yup.object({
  userId: Yup.string().trim().required("User ID is required"),
  password: Yup.string().required("Password is required").password()
});

export default {
  registrationSchema,
  loginSchema
};
