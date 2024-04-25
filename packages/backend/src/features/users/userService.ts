/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser, User } from "../../features/auth/model";

//Todo: validation of the various data each role should provided before update is allowed

export default class UserService {
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
