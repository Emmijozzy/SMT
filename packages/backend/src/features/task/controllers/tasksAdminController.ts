import { Request, Response, Router } from "express";
import { Task, TaskPayload } from "features/task/tasksInterface";
import { ExtendedRequest } from "features/users/userInterface";
import IController from "../../../Interface/controller";
import authMiddleware from "../../../middleware/authMiddleware";
import validationMiddleware from "../../../middleware/validationMiddleware";
import { ENUM_USER_ROLES } from "../../users/enumUserRoles";
import { ITask } from "../model/task";
import taskSchema from "../taskSchema";

import TasksServices from "../../../service/taskService"; // Corrected typo
import { AuthFailureError, BadRequestError, InternalError, NotFoundError } from "../../../utils/ApiError";
import asyncHandler from "../../../utils/asyncHandler";
import filtersToMongooseQuery from "../../../utils/filtersToMongooseQuery";
import getPaginationOptions from "../../../utils/getPaginationOptions";
import successResponse from "../../../utils/successResponse";

export default class TasksAdminController implements IController {
  public path = "/tasks_admin";
  public router = Router();

  constructor() {
    this.initializeRouter();
  }

  private initializeRouter = () => {
    this.router.post("/create", validationMiddleware(taskSchema), this.createTask);
    this.router.get("/tasks", this.getTasks);
    this.router.get("/task", this.getTaskById);
    this.router.put("/update", validationMiddleware(taskSchema), this.updateTask);

    this.router.patch("/delete", authMiddleware(ENUM_USER_ROLES.ADMIN), this.deleteTask);
    this.router.patch("/restore", authMiddleware(ENUM_USER_ROLES.ADMIN), this.restoreTask);
  };

  private createTask = asyncHandler(async (req: Request, res: Response) => {
    const { title, description, responsibleTeam, priority, dueDate, managerTask, managerId, startDate } = req.body;
    if (!title.trim() || !description.trim() || !responsibleTeam || !dueDate)
      throw new BadRequestError("Incomplete data provided");
    const task = await TasksServices.createTask({
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
    const result = await TasksServices.getAll(filters, paginationOptions);

    if (!result || typeof result !== "object") throw new InternalError("Fatal Error fetching tasks");

    successResponse(res, {
      data: result,
      message: "Tasks retrieved successfully."
    });
  });

  private getTaskById = asyncHandler(async (req: Request, res: Response) => {
    const taskId = req.query.taskId as string;

    if (!taskId) throw new BadRequestError("Task ID is required");

    const result = await TasksServices.getTaskById(taskId);

    successResponse(res, {
      data: result,
      message: "Task retrieved successfully"
    });
  });

  private updateTask = asyncHandler(async (req: Request, res: Response) => {
    const {
      taskId,
      title,
      description,
      assignedTo,
      responsibleTeam,
      status,
      managerTask,
      managerId,
      priority,
      startDate,
      dueDate
    } = req.body as Task;

    if (!taskId) throw new BadRequestError("Task ID is required");

    const task = (await TasksServices.getTaskById(taskId)) as ITask;
    if (!task) throw new NotFoundError("Task not found");

    const taskPayload: TaskPayload = {
      ...task,

      title: title || task.title,
      description: description || task.description,
      priority: priority || task.priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : new Date(task.dueDate).toISOString(),
      startDate: startDate ? new Date(startDate).toISOString() : new Date(task.startDate).toISOString()
    };

    // Use enum for task statuses
    if (status === "not started" || status === "in progress" || status === "completed" || status === "closed") {
      taskPayload.status = status;
    }

    if (assignedTo && assignedTo.length !== task.assignedTo.length) {
      taskPayload.assignedTo = assignedTo;
    }

    if (responsibleTeam !== task.responsibleTeam) {
      taskPayload.responsibleTeam = responsibleTeam;
    }

    if (managerTask !== task.managerTask) {
      if (managerTask && !managerId) {
        throw new BadRequestError("Manager ID is required");
      }

      taskPayload.subTasks = [];
      taskPayload.assignedTo = [];
      taskPayload.managerId = managerId || "";
      taskPayload.managerTask = managerTask;
    }

    const result = await TasksServices.updateTaskById(taskPayload);

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
    const deleteTaskData = await TasksServices.deleteTaskById(deleteTaskId);

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

    const restoreTaskData = await TasksServices.restoreTaskById(restoreTaskId);

    successResponse(res, {
      data: {
        taskId: restoreTaskData?.taskId,
        restoreTaskData
      },
      message: "Task restored successfully."
    });
  });
}
