import { IUser, User } from "../model";

export const findByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email: email }).select("-password").lean().exec();
};

export const findByUserId = async (userId: string): Promise<IUser | null> => {
  return User.findOne({ userId: userId }).select("").lean().exec();
};

export default {
  findByEmail,
  findByUserId
};
