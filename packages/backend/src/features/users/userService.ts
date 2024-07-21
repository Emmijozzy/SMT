/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestError, InternalError, NotFoundError } from "../../utils/ApiError";
import { IUser, User } from "../auth/authModel";
import { IPaginationOptions } from "../../utils/getPaginationOptions";
import userUtils from "./userUtils";
import passwordUtils from "../../utils/passwordUtils";
import userValidation from "./userValidation";
import { IProfileToUpdate } from "./userInterface";

const { userProfileUpdateSchema } = userValidation;

//Todo: validation of the various data each role should provided before update is allowed

export default class UserService {
  static async getProfile(user: Partial<IUser>) {
    const data = (await User.find({ userId: user.userId }).select("-password").lean().exec()) as unknown as IUser[];

    const profileData = data[0];

    if (!profileData.userId) throw new InternalError("Error while fetching profile");

    return profileData;
  }

  static async getAll(filter: Record<string, string | number | RegExp>, paginationObption: IPaginationOptions) {
    const { page, limit, sortField, skip, sortOrder } = paginationObption;

    const sort = { [sortField]: sortOrder };

    const users = await User.find(filter).limit(limit).skip(skip).sort(sort).select("-password").lean().exec();

    // const total = await User.countDocuments(filter);
    // return {
    //   users,
    //   total,
    //   totalPage: Math.ceil(+total / limit) * 1,
    //   currentPage: page,
    //   hasNextPage: users.length === limit * 1,
    //   hasPreviousPage: page > 1,
    //   nextPage: page + 1,
    //   previousPage: page - 1,
    //   lastPage: Math.ceil(+total / limit)
    // };
    return users;
  }

  static async getUserById(userId: string) {
    const user = (await userUtils.findByUserId(userId)) as Partial<IUser>;

    delete user.password;

    return user;
  }

  static async updateProfile(userId: string, profileToUpdate: IProfileToUpdate) {
    const canUpdate = ["email", "phoneNo", "location", "whatsappLink", "facebookLink", "linkedInLink"];

    const user = (await userUtils.findByUserId(userId)) as IUser;
    if (!user.userId) throw new NotFoundError(` User with id : ${userId} not found`);

    if (!Object.keys(profileToUpdate).every((data) => canUpdate.includes(data)))
      throw new BadRequestError("Unathorized data Update request");

    const { phoneNo, email, location, whatsappLink, facebookLink, linkedInLink } = profileToUpdate;

    const payload = {
      email,
      phone_no: phoneNo,
      location,
      socialLinks: {
        whatsappLink,
        facebookLink,
        linkedInLink
      }
    };

    const updatedProfile = userUtils.updateUserById(userId, payload);

    if (!updatedProfile) throw new InternalError("Error updating profile");
    return updatedProfile;
  }

  static async changePassword(userId: string, { oldPassword, newPassword }: Record<string, string>) {
    if (oldPassword == newPassword) throw new BadRequestError("Old and new password can not be the same");

    const user = (await userUtils.findByUserId(userId)) as IUser;

    const match = await passwordUtils.compare(oldPassword, user);

    if (!match) throw new BadRequestError("Invalid old password");

    const hashedPassword = await passwordUtils.hash(newPassword);

    const updatedUser = await userUtils.updateUserById(userId, { password: hashedPassword });

    if (!updatedUser) throw new InternalError("Error in changing password");

    return updatedUser;
  }

  static async canEditUser(userId: string, userRole: string, editedData: Partial<IUser>): Promise<boolean> {
    const targetUserId = editedData.id;

    // Implement authorization checks based on role and edited data
    if (userRole === "admin") {
      // Admin can edit all personal data except specific properties (excluding targetUserId)
      const restrictedProps = [""]; // Assuming other properties for admins to not edit
      return userId === targetUserId || !Object.keys(editedData).some((key) => restrictedProps.includes(key));
    } else if (userRole === "manager") {
      // Manager can edit all properties except specific ones (excluding targetUserId)
      const restrictedProps = ["team", "role", "permissions", "del_flg"];
      const restrictedForOthers = ["team", "role", "profilePic", "permissions", "password"]; // Restricted for non-managers
      return (
        (userId === targetUserId && !restrictedProps.some((key) => editedData.hasOwnProperty(key))) ||
        !restrictedForOthers.some((key) => editedData.hasOwnProperty(key))
      );
    } else if (userRole === "team_member") {
      // Team member can only edit specific properties with a value and no others
      const allowedProps = ["email", "profilePicUrl"];
      return (
        userId === targetUserId &&
        allowedProps.every((key) => editedData.hasOwnProperty(key)) &&
        !Object.keys(editedData).some((key) => !allowedProps.includes(key))
      );
    }

    return false; // Default to not authorized
  }

  static async editUser(editRequstData: Partial<IUser>) {
    const userId = editRequstData.userId;
    delete editRequstData.userId;

    const updateduser = await User.findOneAndUpdate({ userId }, editRequstData, {
      new: true
    }).select("-password");

    return updateduser;
  }
}
