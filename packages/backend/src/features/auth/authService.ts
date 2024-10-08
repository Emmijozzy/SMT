import { User, IUser } from "./authModel";
import passwordUtils from "../../utils/passwordUtils";
import { InternalError, NotFoundError, BadRequestError, AuthFailureError } from "../../utils/ApiError";
import userService from "../../service/userService";
import tokenUtils from "../../utils/tokenUtils";
import { Token } from "./authInterface";

export default class UserService {
  public static async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<IUser | Error> {
    try {
      const foundUser: IUser | null = await userService.findByEmail(email);
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
      throw new InternalError(`${error}`);
    }
  }

  public static async login(userId: string, password: string): Promise<Token> {
    const foundUser: IUser | null = await userService.findByUserId(userId);
    if (!foundUser) {
      throw new NotFoundError("User not found");
    } else if (foundUser.del_flg) {
      throw new NotFoundError("User not active");
    }

    const matchPassword = await passwordUtils.compare(password, foundUser);
    if (!matchPassword) {
      throw new AuthFailureError("Wrong password");
    }

    // const foundUserdata = {
    //   userId: foundUser.userId,
    //   role: foundUser.role
    // };
    const foundUserdata: Partial<IUser> = foundUser;
    delete foundUserdata?.password;

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

    const foundUser: IUser | null = await userService.findByUserId(userId);
    if (!foundUser) {
      throw new NotFoundError("User not found");
    }

    const foundUserdata = {
      userId: foundUser.userId,
      role: foundUser.role
    };

    return await tokenUtils.createAccessToken(foundUserdata);
  }
}
