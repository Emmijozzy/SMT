import { UserRepository } from "../../features/users/userRepository";
import userService from "../../service/userService";
import {
  AuthFailureError,
  BadRequestError,
  InternalError,
  NotFoundError,
  TokenExpiresError
} from "../../utils/ApiError";
import passwordUtils from "../../utils/passwordUtils";
import tokenUtils from "../../utils/tokenUtils";
import { Token } from "./authInterface";
import { IUser, User } from "./authModel";

export default class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async register(firstName: string, lastName: string, email: string, password: string): Promise<IUser | Error> {
    try {
      const foundUser: IUser | null = await this.userRepository.findByEmail(email);
      if (foundUser) throw new BadRequestError("User already registered");

      const hashedPassword = await passwordUtils.hash(password);

      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
      });
      return user;
    } catch (err) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("ERROR: " + error.message, error.stack, __filename);
    }
  }

  public async login(userId: string, password: string): Promise<Token> {
    try {
      const foundUser: IUser | null = await this.userRepository.findUserWithPasswordById(userId);
      if (!foundUser) {
        throw new NotFoundError("User not found");
      } else if (foundUser.del_flg) {
        throw new NotFoundError("User not active");
      }

      // console.log("foundUser", foundUser);

      const matchPassword = await passwordUtils.compare(password, foundUser.password);
      if (!matchPassword) {
        throw new AuthFailureError("Wrong password");
      }
      const foundUserData: Partial<IUser> = foundUser;
      delete foundUserData?.password;

      const accessToken = tokenUtils.createAccessToken(foundUser);
      const refreshToken = tokenUtils.createRefreshToken(foundUser.userId);

      return {
        accessToken,
        refreshToken
      };
    } catch (err) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("ERROR: " + error.message, error.stack, __filename);
    }
  }

  public async refresh(refreshToken: string): Promise<string> {
    try {
      const userId = await tokenUtils.verifyRefreshToken(refreshToken);
      if (typeof userId !== "string") throw new InternalError("Invalid token");

      const foundUser: IUser | null = await this.userRepository.findById(userId);
      if (!foundUser) {
        throw new NotFoundError("User not found");
      }

      const foundUserData = {
        userId: foundUser.userId,
        role: foundUser.role
      };

      return await tokenUtils.createAccessToken(foundUserData);
    } catch (err) {
      const error = err as Error;
      console.error(error.message);
      throw new TokenExpiresError("ERROR: " + error.message, error.stack, __filename);
    }
  }
}
