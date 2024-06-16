import { Router, Response } from "express";
import IController from "../../Interface/controller";
import asyncHandler from "../../utils/asyncHandler";
// import { IUser, User } from "../auth/authModel";
import { AuthFailureError, BadRequestError, InternalError } from "../../utils/ApiError";
import successResponse from "../../utils/successResponse";
import userUtils from "./userUtils";
import { ExtendedRequest } from "./userInterface";
// import validationMiddleware from "../../middleware/validationMiddleware";
// import userValidation from "./userValidation";
import UserService from "./userService";
import authMiddleware from "../../middleware/authMiddleware";
import { ENUM_USER_ROLES } from "./enumUserRoles";
import getPaginationOptions from "../../utils/getPaginationOptions";
import filtersToMongooseQuery from "../../utils/filtersToMongooseQuery";
import validationMiddleware from "../../middleware/validationMiddleware";
import userValidation from "./userValidation";

export default class UserController implements IController {
  public path = "/user";
  public router = Router();

  constructor() {
    this.initializeRouter();
  }

  //TODO - Do not forget to add the auth validation to each respective route

  private initializeRouter(): void {
    this.router.get(
      "/profile",
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER, ENUM_USER_ROLES.TEAM_MEMBER),
      this.getUserProfile
    );
    this.router.get("/get_all", this.getAll);
    this.router.get("/get_by_userId/:userId", this.getUserById);
    this.router.patch(
      "/update_profile",
      validationMiddleware(userValidation.userProfileUpdateSchema),
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER, ENUM_USER_ROLES.TEAM_MEMBER),
      this.updateProfile
    );
    this.router.patch(
      "/update",
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER, ENUM_USER_ROLES.TEAM_MEMBER),
      this.updateUser
    ); // * update : Email, phone, location, Social Link(Whatsapp, facebook, linkedIn)
    this.router.patch(
      "/change_password",
      validationMiddleware(userValidation.changedPasswordSchema),
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER, ENUM_USER_ROLES.TEAM_MEMBER),
      this.changePassword
    );
    this.router.patch("/delete", authMiddleware(ENUM_USER_ROLES.ADMIN), this.deleteUser);
  }

  private getUserProfile = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const user = req.user;
    if (!user) throw new InternalError("Internal server error");

    const result = await UserService.getProfile(user);
    //console.log(result);
    successResponse(res, {
      data: { ...result },
      message: "Profile retrieved successfully!"
    });
  });

  private getAll = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    let queryFilter = req.query.filters;
    if (!queryFilter) {
      queryFilter = "{}";
    }

    const filters = filtersToMongooseQuery(JSON.parse(String(queryFilter)) as Record<string, string>);

    if (!filters) throw new BadRequestError("Invalid filter");

    const result = await UserService.getAll(
      filters,
      getPaginationOptions(req.query.pagination as Record<string, string>)
    );

    if (!result || !result.users?.length) throw new InternalError("Fatal Error fetching users");

    successResponse(res, {
      data: result,
      message: "User list retrieved successfully."
    });
  });

  private getUserById = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const result = await UserService.getUserById(req.params.userId);

    successResponse(res, {
      data: result,
      message: "User data retrieved successfully"
    });
  });

  private updateProfile = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) throw new InternalError("Internal server error");

    const result = await UserService.updateProfile(userId, req.body);

    successResponse(res, {
      data: result,
      message: "Profile updated successfully"
    });
  });

  private updateUser = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    if (!req.user) throw new InternalError("Internal servre Error");
    const { userId: requestingUserId, userRole: requestingUserRole } = req.user; // Destructuring for concise variable access

    // Validate required properties
    if (!requestingUserId || !requestingUserRole) {
      throw new BadRequestError("Missing required user details in request body");
    }

    // Sanitize data in a single step
    const sanitizedData = userUtils.sanitizeData(req.body);

    // Perform authorization check
    const isAuthorized = await UserService.canEditUser(requestingUserId, requestingUserRole, sanitizedData);
    if (!isAuthorized) {
      throw new AuthFailureError("Unauthorized to edit user");
    }

    const updatedUser = await UserService.editUser(sanitizedData);
    if (!updatedUser) throw new InternalError("Failed to update user");
    successResponse(res, {
      data: updatedUser,
      message: "User data modified successfully"
    });
  });

  private changePassword = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) throw new InternalError("Internal server error");

    await UserService.changePassword(userId, req.body);

    successResponse(res, {
      data: null,
      message: "Password changed successfully"
    });
  });

  private deleteUser = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const requestUserRole = req.user?.userRole;
    if (!requestUserRole) throw new InternalError("unauthorized");
    if (requestUserRole != "admin") throw new AuthFailureError("unauthorized");
    const { deleteUserId }: { deleteUserId: string } = req.body;
    if (!deleteUserId) throw new BadRequestError("User ID required");

    const deleteUserData = await userUtils.deleteByuserId(deleteUserId);

    successResponse(res, {
      data: {
        userId: deleteUserData?.userId,
        deleteUserData
      },
      message: "User deleted successfully."
    });
  });
}
