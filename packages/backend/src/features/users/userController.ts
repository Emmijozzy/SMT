import { Response, Router } from "express";
import IController from "../../Interface/controller";
import authMiddleware from "../../middleware/authMiddleware";
import validationMiddleware from "../../middleware/validationMiddleware";
import { AuthFailureError, BadRequestError, InternalError, NotFoundError } from "../../utils/ApiError";
import asyncHandler from "../../utils/asyncHandler";
import filtersToMongooseQuery from "../../utils/filtersToMongooseQuery";
import getPaginationOptions from "../../utils/getPaginationOptions";
import successResponse from "../../utils/successResponse";
import { ENUM_USER_ROLES } from "./enumUserRoles";
import { ExtendedRequest } from "./userInterface";
import { UserService } from "./userService";
import userValidation from "./userValidation";

export default class UserController implements IController {
  public path = "/user";
  public router = Router();
  private userService: UserService;

  constructor() {
    this.initializeRouter();
    this.userService = new UserService();
  }

  private initializeRouter(): void {
    this.router.get(
      "/profile",
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER, ENUM_USER_ROLES.TEAM_MEMBER),
      this.getUserProfile
    );
    this.router.get("/get_all", authMiddleware(ENUM_USER_ROLES.ADMIN), this.getAll);
    this.router.get("/get_by_userId/:userId", this.getUserById);
    this.router.patch(
      "/update_profile",
      validationMiddleware(userValidation.userProfileUpdateSchema),
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER, ENUM_USER_ROLES.TEAM_MEMBER),
      this.updateProfile
    );
    this.router.patch(
      "/change_password",
      validationMiddleware(userValidation.changedPasswordSchema),
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER, ENUM_USER_ROLES.TEAM_MEMBER),
      this.changePassword
    );
  }

  private getUserProfile = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const user = req.user;
    if (!user) throw new InternalError("Internal server error");

    const result = await this.userService.getUserById(user.userId);
    successResponse(res, {
      data: result,
      message: "Profile retrieved successfully!"
    });
  });

  private getAll = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const queryFilter = req.query.filters || "{}";
    const pagination = req.query.pagination ? JSON.parse(req.query.pagination as string) : {};

    const filters = filtersToMongooseQuery(JSON.parse(queryFilter as string));
    const paginationOptions = getPaginationOptions(pagination as Record<string, string>);

    const result = await this.userService.getAllUsers(filters, paginationOptions);
    successResponse(res, {
      data: result,
      message: "User list retrieved successfully."
    });
  });

  private getUserById = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const userId = req.params.userId;
    const result = await this.userService.getUserById(userId);
    if (!result) throw new NotFoundError(`User with id: ${userId} not found`);

    successResponse(res, {
      data: result,
      message: "User data retrieved successfully"
    });
  });

  private updateProfile = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) throw new InternalError("Internal server error");

    const result = await this.userService.updateProfile(userId, req.body);
    successResponse(res, {
      data: result,
      message: "Profile updated successfully"
    });
  });

  private changePassword = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) throw new InternalError("Internal server error");

    await this.userService.changePassword(userId, req.body);
    successResponse(res, {
      data: null,
      message: "Password changed successfully"
    });
  });
}
