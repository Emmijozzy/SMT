import { Request, Response, Router } from "express";
import IController from "../../../Interface/controller";
import { ENUM_USER_ROLES } from "../../users/enumUserRoles";
import authMiddleware from "../../../middleware/authMiddleware";
import asyncHandler from "../../../utils/asyncHandler";
import validationMiddleware from "../../../middleware/validationMiddleware";
import { userAdminSchema, userUpdateAdminSchema } from "./userAdminValidation";
import userService from "../../../service/userService";
import { IUser } from "../../../features/auth/authModel";
import successResponse from "../../../utils/successResponse";
import { ExtendedRequest } from "../../../features/users/userInterface";
import { InternalError, BadRequestError, AuthFailureError } from "../../../utils/ApiError";

export default class UserAdminController implements IController {
  public path = "/user_admin";
  public router = Router();

  constructor() {
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
  }

  private createUser = asyncHandler(async (req: Request, res: Response) => {
    const payload: Partial<IUser> = userService.userDataRestructure(req.body);

    console.log("createCalled");

    const result = await userService.createUser(payload);

    if (!result) throw new Error("User not created");

    successResponse(res, {
      message: "User created successfully!",
      data: { userId: result.userId }
    });
  });

  private updateUser = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    if (!req.user) throw new InternalError("Internal servre Error");
    const { userId: requestingUserId, userRole: requestingUserRole } = req.user; // Destructuring for concise variable access

    const payload: Partial<IUser> = userService.userDataRestructure(req.body);

    // Sanitize data in a single step
    const sanitizedData = userService.sanitizeData(payload);

    // Perform authorization check
    const isAuthorized = await userService.canEditUser(requestingUserId, requestingUserRole, sanitizedData);
    if (!isAuthorized) {
      throw new AuthFailureError("Unauthorized to edit user");
    }
    // console.log(sanitizedData);
    const updatedUser = await userService.editUser(sanitizedData);
    // console.log("update:", updatedUser);
    if (!updatedUser) throw new InternalError("Failed to update user");
    successResponse(res, {
      data: updatedUser,
      message: "User data modified successfully"
    });
  });

  private deleteUser = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const requestUserRole = req.user?.userRole;
    if (!requestUserRole) throw new InternalError("unauthorized");
    if (requestUserRole != "admin") throw new AuthFailureError("unauthorized");
    const { deleteUserId }: { deleteUserId: string } = req.body;
    console.log(deleteUserId);
    if (!deleteUserId) throw new BadRequestError("User ID required");

    const deleteUserData = await userService.deleteByuserId(deleteUserId);

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
    if (!requestUserRole) throw new InternalError("unauthorized");
    if (requestUserRole != "admin") throw new AuthFailureError("unauthorized");
    const { restoreUserId }: { restoreUserId: string } = req.body;
    console.log(restoreUserId);
    if (!restoreUserId) throw new BadRequestError("User ID required");

    const deleteUserData = await userService.restoreByuserId(restoreUserId);

    successResponse(res, {
      data: {
        userId: deleteUserData?.userId,
        deleteUserData
      },
      message: "User restore successfully."
    });
  });
}
