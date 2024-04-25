import { Router, Request, Response } from "express";
import IController from "../../Interface/controller";
import asyncHandler from "../../utils/asyncHandler";
import { User } from "../auth/model";
import { AuthFailureError, BadRequestError, InternalError } from "../../utils/ApiError";
import SuccessResponse from "../../utils/successResponse";
import userUtils from "./userUtils";
import { ExtendedRequest } from "./userInterface";
import validationMiddleware from "../../middleware/validationMiddleware";
import userUpdateSchema from "./userValidation";
import UserService from "./userService";
import authenticationMiddleware from "../../middleware/authenticationMiddleware";

export default class UserController implements IController {
  public path = "/user";
  public router = Router();

  constructor() {
    this.initializeRouter();
  }

  private initializeRouter(): void {
    this.router.get("/", authenticationMiddleware, this.getUsers);
    this.router.patch("/delete", authenticationMiddleware, this.deleteUser);
    this.router.patch("/update", validationMiddleware(userUpdateSchema), authenticationMiddleware, this.updateUser);
  }

  private getUsers = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const requestUserRole = req.user?.userRole;
    console.log(req.user);
    if (requestUserRole != "admin") throw new AuthFailureError("Unauthorized");

    const users = await User.find().select("-password").lean().exec();

    if (!users) throw new InternalError("Fatal Error fetching users");

    new SuccessResponse(users).send(res);
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
    new SuccessResponse(updatedUser).send(res);
  });

  private deleteUser = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const requestUserRole = req.user?.userRole;
    if (!requestUserRole) throw new InternalError("unauthorized");
    if (requestUserRole != "admin") throw new AuthFailureError("unauthorized");
    const { deleteUserId }: { deleteUserId: string } = req.body;
    if (!deleteUserId) throw new BadRequestError("User ID required");

    const deleteUserData = await userUtils.deleteByuserId(deleteUserId);

    new SuccessResponse({ userId: deleteUserData?.userId, deleteUserData }).send(res);
  });
}
