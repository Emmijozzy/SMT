/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestError, InternalError, NotFoundError } from "../../utils/ApiError";
import { IUser, User } from "../auth/authModel";
import { IPaginationOptions } from "../../utils/getPaginationOptions";
import userUtils from "./userUtils";
import passwordUtils from "../../utils/passwordUtils";
import userValidation from "./userValidation";

const { userProfileUpdateSchema } = userValidation;

//Todo: validation of the various data each role should provided before update is allowed

interface IProfileToUpdate {
  profilePicUrl: string;
  email: string;
  password: string;
}

export default class UserService {
  static async getProfile(user: Partial<IUser>) {
    const profileData = User.find({ userId: user.userId }).select("-password").lean().exec();
    if (!profileData) throw new InternalError("Error while fetching profile");

    return profileData;
  }

  static async getAll(filter: Record<string, string | number | RegExp>, paginationObption: IPaginationOptions) {
    const { page, limit, sortField, skip, sortOrder } = paginationObption;

    const sort = { [sortField]: sortOrder };

    const users = await User.find(filter).limit(limit).skip(skip).sort(sort).lean().exec();

    const total = await User.countDocuments(filter);
    return {
      users,
      total,
      totalPage: Math.ceil(+total / limit) * 1,
      currentPage: page,
      hasNextPage: users.length === limit * 1,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(+total / limit)
    };
  }

  static async getUserById(userId: string) {
    if (!userId || !Number.parseInt(userId.slice(4))) throw new BadRequestError("Invalid User ID");

    const user = (await userUtils.findByUserId(userId)) as Partial<IUser>;

    if (!user.userId) throw new NotFoundError(` User with id : ${userId} not found`);

    delete user.password;

    return user;
  }

  static async updateProfile(userId: string, profileToUpdate: IProfileToUpdate) {
    const canUpdate = ["profilePicUrl", "emial", "password"];
    if (Object.keys(profileToUpdate).every((data) => canUpdate.includes(data)))
      throw new BadRequestError("Unathorized data Update request");

    await userProfileUpdateSchema.validate(profileToUpdate);

    const { password, profilePicUrl, email } = profileToUpdate;

    let hashedPassword;
    let updatedProfile;
    if (!!profileToUpdate.password) {
      hashedPassword = await passwordUtils.hash(password);
      updatedProfile = userUtils.updateUserById(userId, { profilePicUrl, email, password: hashedPassword });
    } else {
      console.warn("no password provided");
      updatedProfile = userUtils.updateUserById(userId, { profilePicUrl, email });
    }

    if (!updatedProfile) throw new InternalError("Error updating profile");
    return updatedProfile;
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
