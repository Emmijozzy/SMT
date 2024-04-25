/* eslint-disable indent */
import { BadRequestError, InternalError } from "../../utils/ApiError";
import { IUser, User } from "../auth/model";

export const findByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email: email }).select("-password").lean().exec();
};

export const findByUserId = async (userId: string): Promise<IUser | null> => {
  return User.findOne({ userId: userId }).select("").lean().exec();
};

export const deleteByuserId = async (userId: string): Promise<IUser | null> => {
  const user: IUser | null = await findByUserId(userId);
  console.log(user);
  if (!user) throw new BadRequestError("Invalid User / User does exist");

  const deletedUser = await User.findOneAndUpdate({ userId: user.userId }, { del_flg: true }, { new: true }).select(
    "-password"
  );

  if (!deletedUser?.del_flg) throw new InternalError("Fatal Error deleting user");

  return deletedUser;
};

export const sanitizeData = (data: Partial<IUser>): Partial<IUser> => {
  for (const key in data) {
    switch (key) {
      case "email":
        if (data.email) data.email = data.email.toLowerCase().trim();
        break;
      case "firstName":
        if (data.firstName) data.firstName = data.firstName.toUpperCase().trim();
        break;
      case "lastName":
        if (data.lastName) data.lastName = data.lastName.toUpperCase().trim();
        break;
    }
  }

  return data;
};

export default {
  findByEmail,
  findByUserId,
  deleteByuserId,
  sanitizeData
};
