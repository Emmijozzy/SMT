import IController from "Interface/controller";
import { Router, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { AuthFailureError, BadRequestError } from "../../utils/ApiError";
import { IUser } from "./authModel";
import UserService from "./authService";
import authSchema from "./authValidation";
import validationMiddleware from "../../middleware/validationMiddleware";
import successResponse from "../../utils/successResponse";

export default class Auth implements IController {
  public path = "/auth";
  public router = Router();
  private service = UserService;

  constructor() {
    this.initiatlizeRouter();
  }

  private initiatlizeRouter(): void {
    this.router.post("/register", validationMiddleware(authSchema.registrationSchema), this.register);
    this.router.post("/login", validationMiddleware(authSchema.loginSchema), this.login);
    this.router.get("/refresh", this.refresh);
  }

  private register = asyncHandler(async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    // console.log(firstName, lastName, email, password);
    if (!firstName || !lastName || !email || !password) {
      throw new BadRequestError("Missing user data");
    }

    const userResponse: IUser | Error = await this.service.register(firstName, lastName, email, password);
    if (userResponse instanceof Error) {
      res.status(500).json({ error: "Failed to register user" });
      throw new Error(`Error registering user:${userResponse.message}`);
    } else {
      const user: IUser = userResponse;
      successResponse(res, {
        message: "User registered successfully!",
        data: { userId: user.userId }
      });
    }
  });

  private login = asyncHandler(async (req: Request, res: Response) => {
    const { userId, password } = req.body;
    console.log(userId, password);
    if (!userId || !password) {
      throw new BadRequestError("Missing user data");
    }

    const { accessToken, refreshToken } = await this.service.login(userId, password);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      // sameSite: "Node",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    successResponse(res, {
      message: "You're logged in!",
      data: { accessToken }
    });
  });

  private refresh = asyncHandler(async (req: Request, res: Response) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) throw new AuthFailureError("Unauthorized");

    const refreshToken = cookies.jwt;

    const accessToken = await this.service.refresh(refreshToken);

    res.json({ accessToken });
  });
}
