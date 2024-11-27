import { Request, Response, Router } from "express";
import { ENUM_USER_ROLES } from "../../features/users/enumUserRoles";
import { ExtendedRequest } from "../../features/users/userInterface";
import authMiddleware from "../../middleware/authMiddleware";
import IController from "../../Interface/controller";
import validationMiddleware from "../../middleware/validationMiddleware";
import { BadRequestError, InternalError } from "../../utils/ApiError";
import asyncHandler from "../../utils/asyncHandler";
import successResponse from "../../utils/successResponse";
import SubtaskOrchestrator from "./subtaskOrchestrator";
import subtaskSchema from "./subtaskSchema";
import SubtaskService from "./subtaskService";

export default class SubtaskController implements IController {
  public path = "/subtask";
  public router = Router();
  private subtaskService: SubtaskService;
  private subtaskOrchestrator: SubtaskOrchestrator;

  constructor() {
    this.subtaskService = new SubtaskService();
    this.subtaskOrchestrator = new SubtaskOrchestrator();
    this.initializeRouter();
  }

  private initializeRouter(): void {
    this.router.post(
      "/create",
      validationMiddleware(subtaskSchema.createSchema),
      authMiddleware(ENUM_USER_ROLES.MANAGER),
      this.createSubtask
    );
    this.router.get(
      "/",
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER, ENUM_USER_ROLES.TEAM_MEMBER),
      this.getSubtasks
    );
    this.router.get(
      "/:subtaskId",
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER, ENUM_USER_ROLES.TEAM_MEMBER),
      this.getSubtaskById
    );
    this.router.get(
      "/:taskId",
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER),
      this.getSubtasksByTaskId
    );
    this.router.get(
      "/:assignee",
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER, ENUM_USER_ROLES.TEAM_MEMBER),
      this.getSubtasksByAssignee
    );
    this.router.put(
      "/",
      validationMiddleware(subtaskSchema.updateSchema),
      authMiddleware(ENUM_USER_ROLES.MANAGER),
      this.updateSubtask
    );
    this.router.delete("/:subtaskId", authMiddleware(ENUM_USER_ROLES.MANAGER), this.deleteSubtask);
  }

  private createSubtask = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const userId = req.user?.userId;
    const subtask = await this.subtaskOrchestrator.createSubtask(req.body, userId as string);
    successResponse(res, { data: subtask, message: "Subtask created successfully" });
  });

  private getSubtasks = asyncHandler(async (req: Request, res: Response) => {
    const subtasks = await this.subtaskService.getSubtasks();
    successResponse(res, { data: subtasks, message: "Subtasks fetched successfully" });
  });

  private getSubtaskById = asyncHandler(async (req: Request, res: Response) => {
    const { subtaskId: paramId } = req.params;
    const { subtaskId: queryId } = req.query;
    const subtaskId = queryId || paramId;
    if (!subtaskId) throw new BadRequestError("Subtask ID is required");
    const subtask = await this.subtaskService.getSubtaskById(subtaskId as string);
    successResponse(res, { data: subtask, message: "Subtask fetched successfully" });
  });

  private getSubtasksByTaskId = asyncHandler(async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const subtasks = await this.subtaskService.getSubtasksByTaskId(taskId);
    if (!subtasks) throw new InternalError("Error fetching subtasks");
    successResponse(res, { data: subtasks, message: "Subtasks fetched successfully" });
  });

  private getSubtasksByAssignee = asyncHandler(async (req: Request, res: Response) => {
    const { assignee } = req.params;
    const subtasks = await this.subtaskService.getSubtaskByAssignee(assignee);
    if (!subtasks) throw new InternalError("Error fetching subtasks");
    successResponse(res, { data: subtasks, message: "Subtasks fetched successfully" });
  });

  private updateSubtask = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const userId = req.user?.userId;
    const updatedSubtask = await this.subtaskOrchestrator.updateSubtask(req.body, userId as string);
    successResponse(res, { data: updatedSubtask, message: "Subtask updated successfully" });
  });

  private deleteSubtask = asyncHandler(async (req: Request, res: Response) => {
    const { subtaskId } = req.params;
    const subtask = await this.subtaskOrchestrator.deleteSubtask(subtaskId);
    if (!subtask) throw new InternalError("Failed to delete subtask");
    successResponse(res, { message: "Subtask deleted successfully" });
  });
}
