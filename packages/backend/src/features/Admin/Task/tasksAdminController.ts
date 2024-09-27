import { Request, Response, Router } from "express";
import { Task, TaskPayload } from "features/task/tasksInterface";
import { ExtendedRequest } from "features/users/userInterface";
import { ITask } from "../../../features/task/model/task";
import taskSchema from "../../../features/task/taskSchema";
import { ENUM_USER_ROLES } from "../../../features/users/enumUserRoles";
import IController from "../../../Interface/controller";
import authMiddleware from "../../../middleware/authMiddleware";
import validationMiddleware from "../../../middleware/validationMiddleware";
import TasksSevices from "../../../service/taskService";
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
    this.router.post("/create", this.createTask); /* *TODO - Validate Data recived  */
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

    const task = await TasksSevices.createTask({
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
    let queryFilter = req.query.filters;
    // console.log(queryFilter);
    if (!queryFilter) {
      queryFilter = "{}";
    }

    const stringObject = req.query.pagination as string;
    console.log(stringObject);
    let pagination;
    if (!stringObject) {
      pagination = {};
    } else {
      pagination = JSON.parse(stringObject);
    }

    if (typeof pagination !== "object") throw new BadRequestError("Error parsing pagination");

    const filters = filtersToMongooseQuery(JSON.parse(String(queryFilter)) as Record<string, string>);

    if (!filters) throw new BadRequestError("Invalid filter");

    if (!pagination.sortField) pagination.sortField = "taskId";

    const result = await TasksSevices.getAll(filters, getPaginationOptions(pagination as Record<string, string>));

    if (!result || typeof result !== "object") throw new InternalError("Fatal Error fetching tasks");

    successResponse(res, {
      data: result,
      message: "Tasks retrieved successfully."
    });
  });

  private getTaskById = asyncHandler(async (req: Request, res: Response) => {
    const taskId = req.query.taskId as string;
    if (!taskId && typeof taskId !== "string") throw new BadRequestError("Task ID is required");
    const result = await TasksSevices.getTaskById(taskId);

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

    // * Check if the Task exist
    if (!taskId) throw new BadRequestError("UserId is required");
    const task = (await TasksSevices.getTaskById(taskId)) as ITask;
    if (!task) throw new NotFoundError("Task not found");

    // * update title, description, status, priority, due date
    const taskPayload: TaskPayload = {
      ...task,
      title: title ? title : task.title,
      description: description ? description : task.description,

      priority: priority ? priority : task.priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : new Date(task.dueDate).toISOString(),
      startDate: startDate ? new Date(startDate).toISOString() : new Date(task.startDate).toISOString()
    };

    if (status == "not started" || status == "in progress" || status == "completed" || status == "closed") {
      taskPayload.status = status;
    }

    // * check for assignedTo and perform the necessary update as required if there is change
    if (assignedTo && assignedTo.length != task.assignedTo.length) {
      taskPayload.assignedTo = assignedTo;
    }

    // * check for responsibleTeam and update if there is any update required, then update as required
    if (responsibleTeam != task.responsibleTeam) {
      taskPayload.responsibleTeam = responsibleTeam;
    }

    // * check for managerTask and update if there is change to it and  Also update the managerId along
    if (managerTask != task.managerTask && managerTask) {
      if (!managerId) throw new BadRequestError("Manager Id is required");
      taskPayload.subTasks = [];
      //TODO - Algorithm to delete the subtask created with the task Id
      taskPayload.assignedTo = [];
      taskPayload.managerId = managerId;
      taskPayload.managerTask = managerTask;
    } else if (managerTask != task.managerTask && !managerTask) {
      taskPayload.managerId = "";
      taskPayload.managerTask = managerTask;
    }

    // *  Send the update to the database
    const result = TasksSevices.updateTaskById(taskPayload);

    successResponse(res, {
      data: result,
      message: "Task updated successfully"
    });
  });

  private deleteTask = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const requestUserRole = req.user?.userRole;
    if (!requestUserRole) throw new InternalError("unauthorized");
    if (requestUserRole != "admin") throw new AuthFailureError("unauthorized");

    const { deleteTaskId }: { deleteTaskId: string } = req.body;
    console.log(deleteTaskId);
    if (!deleteTaskId) throw new BadRequestError("Task ID is required");

    const deleteTaskData = await TasksSevices.deleteTaskById(deleteTaskId);

    successResponse(res, {
      data: {
        userId: deleteTaskData?.taskId,
        deleteTaskData
      },
      message: "Task deleted successfully."
    });
  });

  private restoreTask = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const requestUserRole = req.user?.userRole;
    if (!requestUserRole) throw new InternalError("unauthorized");
    if (requestUserRole != "admin") throw new AuthFailureError("unauthorized");

    const { restoreTaskId }: { restoreTaskId: string } = req.body;
    console.log(restoreTaskId);
    if (!restoreTaskId) throw new BadRequestError("Task ID is required");

    const restoreTaskData = await TasksSevices.restoreTaskById(restoreTaskId);

    successResponse(res, {
      data: {
        userId: restoreTaskData?.taskId,
        restoreTaskData
      },
      message: "Task restored successfully."
    });
  });
}
