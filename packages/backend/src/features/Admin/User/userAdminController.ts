import { Request, Response, Router } from "express";
import IController from "../../../Interface/controller";
import { ENUM_USER_ROLES } from "../../users/enumUserRoles";
import authMiddleware from "../../../middleware/authMiddleware";
import asyncHandler from "../../../utils/asyncHandler";
import validationMiddleware from "../../../middleware/validationMiddleware";
import { userAdminSchema } from "./userAdminValidation";
import userService from "../../../service/userService";
import { IUser } from "../../../features/auth/authModel";
import UserAdmin from "./userAdminInterface";
import successResponse from "../../../utils/successResponse";

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
  }

  private createUser = asyncHandler(async (req: Request, res: Response) => {
    const reqUserData = req.body as UserAdmin;
    const payload: Partial<IUser> = {
      firstName: reqUserData.firstName,
      lastName: reqUserData.lastName,
      email: reqUserData.email,
      password: reqUserData.password,
      role: reqUserData.role,
      phone_no: `${reqUserData.phoneNo}`,
      team: reqUserData.team,
      location: reqUserData.location,
      permissions: {
        can_create_tasks: reqUserData.canCreateTasks,
        can_edit_tasks: reqUserData.canEditTasks,
        can_delete_tasks: reqUserData.canDeleteTasks,
        can_view_reports: reqUserData.canViewReports,
        can_add_subtasks: reqUserData.canAddSubtasks,
        can_reassign_tasks: reqUserData.canReassignTasks,
        can_delete_users: reqUserData.canDeleteUsers,
        can_edit_users: reqUserData.canEditUsers,
        can_assign_roles: reqUserData.canAssignRole
      },
      socialLinks: {
        whatsappLink: reqUserData.whatsappLink,
        facebookLink: reqUserData.facebookLink,
        linkedInLink: reqUserData.linkedInLink
      }
    };

    console.log("createCalled");

    const result = await userService.createUser(payload);

    if (!result) throw new Error("User not created");

    successResponse(res, {
      message: "User created successfully!",
      data: { userId: result.userId }
    });
  });
}
