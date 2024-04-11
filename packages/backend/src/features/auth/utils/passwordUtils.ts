import bcrypt from "bcrypt";
import { IUser } from "../model";

const hash = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

const compare = async (inputPassword: string, foundUser: IUser): Promise<boolean> => {
  return await bcrypt.compare(inputPassword, foundUser.password);
};

export default {
  hash,
  compare
};
