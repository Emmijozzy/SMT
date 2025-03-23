import { Request, Response, Router } from "express";
import { ENUM_USER_ROLES } from "../../features/users/enumUserRoles";
import { ExtendedRequest } from "../../features/users/userInterface";
import IController from "../../Interface/controller";
import authMiddleware from "../../middleware/authMiddleware";
import validationMiddleware from "../../middleware/validationMiddleware";
import { BadRequestError, InternalError } from "../../utils/ApiError";
import asyncHandler from "../../utils/asyncHandler";
import filtersToMongooseQuery from "../../utils/filtersToMongooseQuery";
import getPaginationOptions from "../../utils/getPaginationOptions";
import successResponse from "../../utils/successResponse";
import { InReviewFeedBackData, InReviewUpdateData } from "./subtaskInterfaces";
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
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER),
      this.createSubtask
    );
    this.router.get(
      "/subtasks",
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
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER),
      this.updateSubtask
    );
    this.router.delete(
      "/:subtaskId",
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER),
      this.deleteSubtask
    );
    this.router.put(
      "/status/:subtaskId",
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER, ENUM_USER_ROLES.TEAM_MEMBER),
      this.updateSubtaskStatus
    );
    this.router.put(
      "/:subtaskId/open-to-in-process",
      authMiddleware(ENUM_USER_ROLES.TEAM_MEMBER),
      this.subtaskOpenToInProcess
    );
    this.router.put(
      "/:subtaskId/to-in-review",
      validationMiddleware(subtaskSchema.InReviewUpdateDataSchema),
      authMiddleware(ENUM_USER_ROLES.TEAM_MEMBER),
      this.subtaskToInReview
    );
    this.router.put(
      "/:subtaskId/in-review-to-completed",
      validationMiddleware(subtaskSchema.InReviewFeedBackDataSchema),
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER),
      this.subtaskInReviewToCompleted
    );
    this.router.put(
      "/:subtaskId/in-review-to-revisit",
      validationMiddleware(subtaskSchema.InReviewFeedBackDataSchema),
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER),
      this.subtaskInReviewToRevisit
    );
    this.router.get(
      "/:subtaskId/audit-logs",
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER, ENUM_USER_ROLES.TEAM_MEMBER),
      this.getSubtaskAuditLogsBySubtaskId
    );
  }

  private createSubtask = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const userId = req.user?.userId;
    const subtask = await this.subtaskOrchestrator.createSubtask(req.body, userId as string);
    successResponse(res, { data: subtask, message: "Subtask created successfully" });
  });

  private getSubtasks = asyncHandler(async (req: Request, res: Response) => {
    const subtaskQueryFilter = req.query.filters;
    const paginationString = req.query.pagination as string;

    const pagination = paginationString ? JSON.parse(paginationString) : {};
    if (typeof pagination !== "object") throw new BadRequestError("Error parsing pagination");

    const filter = filtersToMongooseQuery(JSON.parse(subtaskQueryFilter ? String(subtaskQueryFilter) : "{}"));
    if (!filter) throw new BadRequestError("Invalid filter");
    const paginationOptions = getPaginationOptions({
      ...pagination,
      sortField: pagination.sortField || "subtaskId"
    });

    const subtasks = await this.subtaskService.getSubtasks(filter, paginationOptions);
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

  private deleteSubtask = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const { subtaskId } = req.params;
    const userId = req.user?.userId;
    const subtask = await this.subtaskOrchestrator.deleteSubtask(subtaskId, userId as string);
    if (!subtask) throw new InternalError("Failed to delete subtask");
    successResponse(res, { message: "Subtask deleted successfully" });
  });

  private updateSubtaskStatus = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const { subtaskId } = req.params;
    const { status } = req.body;

    const userId = req.user?.userId;
    if (!userId) throw new InternalError("User ID is required");

    const subtask = await this.subtaskService.updateSubtaskStatus(subtaskId, status, userId);
    if (!subtask) throw new InternalError("Failed to transition subtask");
    successResponse(res, { data: subtask, message: "Subtask transitioned successfully" });
  });

  private subtaskOpenToInProcess = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const { subtaskId } = req.params;
    const userId = req.user?.userId;
    if (!userId) throw new InternalError("User ID is required");

    const subtask = await this.subtaskOrchestrator.updateSubtaskFromOpenToInProcess(subtaskId, userId);
    if (!subtask) throw new InternalError("Failed to transition subtask");
    successResponse(res, { data: subtask, message: "Subtask transitioned successfully" });
  });

  private subtaskToInReview = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const { subtaskId } = req.params;
    const userId = req.user?.userId;
    if (!userId) throw new InternalError("User ID is required");

    const subtask = await this.subtaskOrchestrator.updateSubtaskFromToInReview(
      subtaskId,
      req.body as InReviewUpdateData,
      userId
    );
    if (!subtask) throw new InternalError("Failed to transition subtask");
    successResponse(res, { data: subtask, message: "Subtask transitioned successfully" });
  });

  private subtaskInReviewToRevisit = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const { subtaskId } = req.params;

    const userId = req.user?.userId;
    if (!userId) throw new InternalError("User ID is required");

    const subtask = await this.subtaskOrchestrator.updateSubtaskFromInReviewToRevisit(
      subtaskId,
      req.body as InReviewFeedBackData,
      userId
    );
    if (!subtask) throw new InternalError("Failed to transition subtask");
    successResponse(res, { data: subtask, message: "Subtask transitioned successfully" });
  });

  private subtaskInReviewToCompleted = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const { subtaskId } = req.params;
    const userId = req.user?.userId;
    if (!userId) throw new InternalError("User ID is required");

    const subtask = await this.subtaskOrchestrator.updateSubtaskFromInReviewToCompleted(
      subtaskId,
      req.body as InReviewFeedBackData,
      userId
    );
    if (!subtask) throw new InternalError("Failed to transition subtask");
    successResponse(res, { data: subtask, message: "Subtask transitioned successfully" });
  });

  private getSubtaskAuditLogsBySubtaskId = asyncHandler(async (req: Request, res: Response) => {
    const { subtaskId } = req.params;
    const auditLogs = await this.subtaskOrchestrator.getSubtaskAuditLogBySubtaskId(subtaskId);
    if (!auditLogs) throw new InternalError("Error fetching audit logs");
    successResponse(res, { data: auditLogs, message: "Audit logs fetched successfully" });
  });
}
