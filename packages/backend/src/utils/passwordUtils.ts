import bcrypt from "bcrypt";
import { IUser } from "../features/auth/authModel";
import { InternalError } from "./ApiError";

const hash = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);

  if (!hashedPassword) throw new InternalError("Error hashing password");

  return hashedPassword;
};

const compare = async (inputPassword: string, foundUser: IUser): Promise<boolean> => {
  return await bcrypt.compare(inputPassword, foundUser.password);
};

export default {
  hash,
  compare
};
