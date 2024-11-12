import { Request, Response, Router } from "express";
import IController from "../../Interface/controller";
import authMiddleware from "../../middleware/authMiddleware";
import validationMiddleware from "../../middleware/validationMiddleware";
// import UserService from "../../service/userService";
import { AuthFailureError, BadRequestError, InternalError } from "../../utils/ApiError";
import asyncHandler from "../../utils/asyncHandler";
import successResponse from "../../utils/successResponse";
import { userAdminSchema, userUpdateAdminSchema } from "../Admin/User/userAdminValidation";
import { ENUM_USER_ROLES } from "./enumUserRoles";
import { ExtendedRequest } from "./userInterface";
import { UserOrchestrator } from "./userOrchestrator";
import { UserService } from "./userService";

export default class UserAdminController implements IController {
  public path = "/user_admin";
  public router = Router();
  private userService: UserService;
  private userOrChestrator: UserOrchestrator;

  constructor() {
    this.userService = new UserService();
    this.userOrChestrator = new UserOrchestrator();
    this.initializeRouter();
  }

  private initializeRouter(): void {
    this.router.post(
      "/create",
      authMiddleware(ENUM_USER_ROLES.ADMIN),
      validationMiddleware(userAdminSchema),
      this.createUser
    );

    this.router.patch(
      "/update",
      authMiddleware(ENUM_USER_ROLES.ADMIN),
      validationMiddleware(userUpdateAdminSchema),
      this.updateUser
    );

    this.router.patch("/delete", authMiddleware(ENUM_USER_ROLES.ADMIN), this.deleteUser);
    this.router.patch("/restore", authMiddleware(ENUM_USER_ROLES.ADMIN), this.restoreUser);
    this.router.delete("/outright_delete/:userId", authMiddleware(ENUM_USER_ROLES.ADMIN), this.outrightDeleteUser);
  }

  private createUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.userOrChestrator.createUser(req.body);

    if (!result) throw new InternalError("User not created");

    successResponse(res, {
      message: "User created successfully!",
      data: { userId: result.userId }
    });
  });

  private updateUser = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    if (!req.user) throw new InternalError("Internal server error");
    const { userId: requestingUserId, userRole: requestingUserRole } = req.user;
    const updatedUser = await this.userOrChestrator.updateUser(requestingUserId, requestingUserRole, req.body);

    successResponse(res, {
      data: updatedUser,
      message: "User data modified successfully"
    });
  });

  private deleteUser = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const requestUserRole = req.user?.userRole;
    if (!requestUserRole || requestUserRole !== "admin") throw new AuthFailureError("Unauthorized");

    const { deleteUserId } = req.body;
    if (!deleteUserId) throw new BadRequestError("User ID required");

    const deleteUserData = await this.userService.deleteUserById(deleteUserId);
    successResponse(res, {
      data: {
        userId: deleteUserData?.userId,
        deleteUserData
      },
      message: "User deleted successfully."
    });
  });

  private restoreUser = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const requestUserRole = req.user?.userRole;
    if (!requestUserRole || requestUserRole !== "admin") throw new AuthFailureError("Unauthorized");

    const { restoreUserId } = req.body;
    if (!restoreUserId) throw new BadRequestError("User ID required");

    const restoreUserData = await this.userService.restoreUserById(restoreUserId);

    successResponse(res, {
      data: {
        userId: restoreUserData?.userId,
        restoreUserData
      },
      message: "User restored successfully."
    });
  });

  private outrightDeleteUser = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const requestUserRole = req.user?.userRole;
    if (!requestUserRole || requestUserRole !== "admin") throw new AuthFailureError("Unauthorized");

    const userId = req.params.userId;
    if (!userId) throw new BadRequestError("User ID required");

    await this.userService.outrightDeleteUserById(userId);
    successResponse(res, {
      data: null,
      message: "User deleted successfully."
    });
  });
}
