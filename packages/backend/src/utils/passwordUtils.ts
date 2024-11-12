import bcrypt from "bcrypt";
import { InternalError } from "./ApiError";

const hash = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);

  if (!hashedPassword) throw new InternalError("Error hashing password");

  return hashedPassword;
};

const compare = async (inputPassword: string, userPassword: string): Promise<boolean> => {
  return await bcrypt.compare(inputPassword, userPassword);
};

export default {
  hash,
  compare
};
