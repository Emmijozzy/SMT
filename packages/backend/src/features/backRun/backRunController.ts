import { Request, Response, Router } from "express";
import { Task } from "../../features/task/model/task";
import { TaskRepository } from "../../features/task/taskRepository";
import { UserService } from "../../features/users/services/userService";
import { UserRepository } from "../../features/users/userRepository";
import IController from "../../Interface/controller";
import { NotFoundError } from "../../utils/ApiError";
import asyncHandler from "../../utils/asyncHandler";
import getPaginationOptions from "../../utils/getPaginationOptions";
import successResponse from "../../utils/successResponse";

export default class BackRunController implements IController {
  public path = "/backrun";
  public router = Router();
  private userService: UserService;
  private userRepository: UserRepository;
  private taskRepository: TaskRepository;

  constructor() {
    this.initializeRouter();
    this.userService = new UserService();
    this.userRepository = new UserRepository();
    this.taskRepository = new TaskRepository();
  }

  private initializeRouter(): void {
    this.router.post("/add_subtaskToAll_task", this.addSubtasktAllTasks);
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

  private addSubtasktAllTasks = asyncHandler(async (req: Request, res: Response) => {
    const allTasks = await Task.find().lean().exec();

    if (!allTasks) throw new NotFoundError();

    allTasks.forEach(async (task) => {
      if (!task.subtasks) {
        task.subtasks = [];
        await Task.findOneAndUpdate({ taskId: task.taskId }, task);
        console.log(`task with Id: ${task.taskId} update with subtask`);
      }
    });

    const newUpadated = await Task.find();

    successResponse(res, {
      data: newUpadated,
      message: "User updated successfully"
    });
  });
}
