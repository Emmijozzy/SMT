import Joi from "joi";
import * as Yup from "yup";
import YupPassword from "yup-password";

YupPassword(Yup);

const userProfileUpdateSchema = Yup.object().shape({
  email: Yup.string().email().trim().optional(),
  password: Yup.string().trim().optional().password(),
  profilePicUrl: Yup.string().url("Please enter a valid profile picture URL").optional()
});

const userUpdateSchema = Joi.object({
  userId: Joi.string().trim().required().error(new Error("UserId is required")),
  firstName: Joi.string()
    .trim()
    .min(2)
    .max(30)
    .error(new Error("firstName is required and must be between 2 and 30 characters long")),
  lastName: Joi.string()
    .trim()
    .min(2)
    .max(30)
    .error(new Error("lastName is required and must be between 2 and 30 characters long")),
  email: Joi.string().trim().email().error(new Error("Please enter a valid email address.")),
  profilePicUrl: Joi.string().trim(),
  role: Joi.string()
    .valid("team_member", "manager", "admin")
    .error(new Error("role must be one of Team member, Manager, or Admin")),
  permissions: Joi.object({
    can_create_tasks: Joi.boolean().valid(true, false).error(new Error("can_create_tasks must be true or false")),
    can_edit_tasks: Joi.boolean().valid(true, false).error(new Error("can_edit_tasks must be true or false")),
    can_view_tasks: Joi.boolean().valid(true, false).error(new Error("can_view_tasks must be true or false")),
    can_delete_tasks: Joi.boolean().valid(true, false).error(new Error("can_delete_tasks must be true or false")),
    can_add_subtasks: Joi.boolean().valid(true, false).error(new Error("can_add_subtasks must be true or false")),
    can_reassign_tasks: Joi.boolean().valid(true, false).error(new Error("can_reassign_tasks must be true or false")),
    can_delete_users: Joi.boolean().valid(true, false).error(new Error("can_delete_users must be true or false")),
    can_edit_users: Joi.boolean().valid(true, false).error(new Error("can_edit_users must be true or false")),
    can_assign_roles: Joi.boolean().valid(true, false).error(new Error("can_assign_roles must be true or false"))
  }).default()
  // No validation needed for del_flg, createdAt, updatedAt, and fullName as they are handled by Mongoose
});

export default {
  userUpdateSchema,
  userProfileUpdateSchema
};
