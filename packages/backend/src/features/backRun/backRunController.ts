import { Request, Response, Router } from "express";
import { UserService } from "../../features/users/services/userService";
import { UserRepository } from "../../features/users/userRepository";
import IController from "../../Interface/controller";
import asyncHandler from "../../utils/asyncHandler";
import getPaginationOptions from "../../utils/getPaginationOptions";
import successResponse from "../../utils/successResponse";

export default class BackRunController implements IController {
  public path = "/backrun";
  public router = Router();
  private userService: UserService;
  private userRepository: UserRepository;

  constructor() {
    this.initializeRouter();
    this.userService = new UserService();
    this.userRepository = new UserRepository();
  }

  private initializeRouter(): void {
    this.router.post("/update_user_with_subtask_id", this.UpdateUserWithSubtaskId);
  }

  private UpdateUserWithSubtaskId = asyncHandler(async (req: Request, res: Response) => {
    const filter = {};
    const paginationOptions = getPaginationOptions({} as Record<string, string>);
    const getUsers = await this.userService.getAllUsers(filter, paginationOptions);
    const updateUser = async () => {
      getUsers.forEach(async (user) => {
        const hasSubtaskId = Object.keys(user).includes("subtasks");
        if (!hasSubtaskId) {
          user.subtasks = [];
          await this.userRepository.updateById(user.userId, user);
          console.log(`User with id ${user.userId} updated with subtask array`);
          return;
        }
      });
    };

    await updateUser();

    const getUpdatedUsers = await this.userService.getAllUsers(filter, paginationOptions);
    successResponse(res, {
      data: getUpdatedUsers,
      message: "User updated successfully"
    });
  });
}
