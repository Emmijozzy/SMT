import { User, IUser } from "./model";
import passwordUtils from "./utils/passwordUtils";
import { InternalError, NotFoundError, BadRequestError, AuthFailureError } from "../../utils/ApiError";
import userUtils from "../users/userUtils";
import tokenUtils from "./utils/tokenUtils";
import { Token } from "./interface";

export default class UserService {
  public static async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<IUser | Error> {
    try {
      const foundUser: IUser | null = await userUtils.findByEmail(email);
      if (foundUser) throw new BadRequestError("User already registered");

      const hashedPassword = await passwordUtils.hash(password);

      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
      });
      return user;
    } catch (error) {
      throw new InternalError(`User registration error: ${error}`);
    }
  }

  public static async login(userId: string, password: string): Promise<Token> {
    const foundUser: IUser | null = await userUtils.findByUserId(userId);
    // console.log(foundUser);
    if (!foundUser) {
      throw new NotFoundError("User not found");
    } else if (foundUser.del_flg) {
      throw new NotFoundError("User not active");
    }

    const matchPassword = await passwordUtils.compare(password, foundUser);
    if (!matchPassword) {
      throw new AuthFailureError();
    }

    foundUser.password = "";

    const accessToken = tokenUtils.createAccessToken(foundUser);
    const refreshToken = tokenUtils.createRefreshToken(foundUser.userId);

    return {
      accessToken,
      refreshToken
    };
  }

  public static async refresh(refreshToken: string): Promise<string> {
    const userId = await tokenUtils.verifyRefreshToken(refreshToken);
    if (typeof userId !== "string") throw new InternalError("Invalid token");

    const foundUser: IUser | null = await userUtils.findByUserId(userId);
    if (!foundUser) {
      throw new NotFoundError("User not found");
    }

    foundUser.password = "";

    return await tokenUtils.createAccessToken(foundUser);
  }
}
