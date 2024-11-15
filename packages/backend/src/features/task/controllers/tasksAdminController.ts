import { Request, Response, Router } from "express";
import { ExtendedRequest } from "features/users/userInterface";
import IController from "../../../Interface/controller";
import authMiddleware from "../../../middleware/authMiddleware";
import validationMiddleware from "../../../middleware/validationMiddleware";
import { AuthFailureError, BadRequestError, InternalError } from "../../../utils/ApiError";
import asyncHandler from "../../../utils/asyncHandler";
import filtersToMongooseQuery from "../../../utils/filtersToMongooseQuery";
import getPaginationOptions from "../../../utils/getPaginationOptions";
import successResponse from "../../../utils/successResponse";
import { ENUM_USER_ROLES } from "../../users/enumUserRoles";
import { ITask } from "../model/task";
import { TaskOrchestrator } from "../services/taskOrchestrator";
import { TaskService } from "../services/taskService";
import taskSchema from "../taskSchema";

export default class TasksAdminController implements IController {
  public path = "/tasks_admin";
  public router = Router();
  private taskService: TaskService;
  private taskOrchestrator: TaskOrchestrator;

  constructor() {
    this.taskService = new TaskService();
    this.taskOrchestrator = new TaskOrchestrator();
    this.initializeRouter();
  }

  private initializeRouter = () => {
    this.router.post("/create", validationMiddleware(taskSchema), this.createTask);
    this.router.get("/tasks", this.getTasks);
    this.router.get("/task", this.getTaskById);
    this.router.put("/update", validationMiddleware(taskSchema), this.updateTask);

    this.router.patch("/delete", authMiddleware(ENUM_USER_ROLES.ADMIN), this.deleteTask);
    this.router.patch("/restore", authMiddleware(ENUM_USER_ROLES.ADMIN), this.restoreTask);
    this.router.delete("/outright_delete/", authMiddleware(ENUM_USER_ROLES.ADMIN), this.outrightDeleteTask);
  };

  private createTask = asyncHandler(async (req: Request, res: Response) => {
    const { title, description, responsibleTeam, priority, dueDate, managerTask, managerId, startDate } = req.body;

    const task = await this.taskOrchestrator.createTask({
      title,
      description,
      responsibleTeam,
      priority,
      dueDate,
      startDate,
      managerTask,
      managerId
    });

    successResponse(res, {
      data: {
        task
      },
      message: "Task created successfully."
    });
  });

  private getTasks = asyncHandler(async (req: Request, res: Response) => {
    const taskQueryFilter = req.query.filters;
    const paginationString = req.query.pagination as string;

    const pagination = paginationString ? JSON.parse(paginationString) : {};

    if (typeof pagination !== "object") throw new BadRequestError("Error parsing pagination");

    const filters = filtersToMongooseQuery(JSON.parse(String(taskQueryFilter || "{}")) as Record<string, string>);

    if (!filters) throw new BadRequestError("Invalid filter");
    const paginationOptions = getPaginationOptions({
      ...pagination,
      sortField: pagination.sortField || "taskId"
    });

    const populateOptions = [{ path: "responsibleTeam", model: "Team", foreignField: "teamId", select: "name teamId" }];

    const result = await this.taskService.getAll(filters, paginationOptions, populateOptions);

    if (!result || typeof result !== "object") throw new InternalError("Fatal Error fetching tasks");

    successResponse(res, {
      data: result,
      message: "Tasks retrieved successfully."
    });
  });

  private getTaskById = asyncHandler(async (req: Request, res: Response) => {
    const taskId = req.query.taskId as string;
    const populateOptions = [{ path: "responsibleTeam", model: "Team", foreignField: "teamId", select: "name teamId" }];
    const result = await this.taskService.getTaskById(taskId, populateOptions);

    successResponse(res, {
      data: result,
      message: "Task retrieved successfully"
    });
  });

  private updateTask = asyncHandler(async (req: Request, res: Response) => {
    const RequestTaskData = req.body as Partial<ITask>;
    const result = await this.taskOrchestrator.updateTask(RequestTaskData);

    successResponse(res, {
      data: result,
      message: "Task updated successfully"
    });
  });

  private deleteTask = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const requestUserRole = req.user?.userRole;
    if (!requestUserRole) throw new InternalError("Unauthorized");
    if (requestUserRole !== "admin") throw new AuthFailureError("Unauthorized");

    const { deleteTaskId } = req.body as { deleteTaskId: string };
    if (!deleteTaskId) throw new BadRequestError("Task ID is required");
    const deleteTaskData = await this.taskService.deleteTaskById(deleteTaskId);

    successResponse(res, {
      data: {
        taskId: deleteTaskData?.taskId,
        deleteTaskData
      },
      message: "Task deleted successfully."
    });
  });

  private restoreTask = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const requestUserRole = req.user?.userRole;
    if (!requestUserRole) throw new InternalError("Unauthorized");
    if (requestUserRole !== "admin") throw new AuthFailureError("Unauthorized");

    const { restoreTaskId } = req.body as { restoreTaskId: string };
    if (!restoreTaskId) throw new BadRequestError("Task ID is required");

    const restoreTaskData = await this.taskService.restoreTaskById(restoreTaskId);

    successResponse(res, {
      data: {
        taskId: restoreTaskData?.taskId,
        restoreTaskData
      },
      message: "Task restored successfully."
    });
  });

  private outrightDeleteTask = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const requestUserRole = req.user?.userRole;
    if (!requestUserRole) throw new InternalError("Unauthorized");
    if (requestUserRole !== "admin") throw new AuthFailureError("Unauthorized");
    const { deleteTaskId } = req.body as { deleteTaskId: string };
    if (!deleteTaskId) throw new BadRequestError("Task ID is required");
    const deleteTaskData = await this.taskOrchestrator.outrightDeleteTaskById(deleteTaskId);
    if (!deleteTaskData) throw new InternalError("Fatal Error deleting task");
    successResponse(res, {
      data: {
        taskId: deleteTaskData?.taskId,
        deleteTaskData
      },
      message: "Task deleted permanently."
    });
  });
}
