import { IUser, User } from "../features/auth/authModel";
import userUtils from "../features/users/userUtils";
import { BadRequestError, InternalError } from "../utils/ApiError";
import passwordUtils from "../utils/passwordUtils";

const createUser = async (userData: Partial<IUser>) => {
  try {
    if (!userData.email) throw new BadRequestError("Email is required");
    const foundUser: IUser | null = await userUtils.findByEmail(userData.email);
    if (foundUser) throw new BadRequestError("User already registered");

    if (!userData.password) throw new BadRequestError("Password is required");
    const hashedPassword = await passwordUtils.hash(userData.password);

    const user = await User.create({
      ...userData,
      password: hashedPassword
    });
    return user;
  } catch (error) {
    throw new InternalError(`${error}`);
  }
};

export default {
  createUser
};
