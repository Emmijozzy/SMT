import { Response, Router } from "express";
import { ENUM_USER_ROLES } from "../../features/users/enumUserRoles";
import { ExtendedRequest } from "../../features/users/userInterface";
import IController from "../../Interface/controller";
import authMiddleware from "../../middleware/authMiddleware";
import { BadRequestError } from "../../utils/ApiError";
import asyncHandler from "../../utils/asyncHandler";
import filtersToMongooseQuery from "../../utils/filtersToMongooseQuery";
import successResponse from "../../utils/successResponse";
import CommentOrchestrator from "./CommentOrchestrator";
import CommentService from "./commentService";
import { IComment } from "./interfaces/comment.interface";

export default class CommentController implements IController {
  public path = "/comment";
  public router = Router();
  private commentService: CommentService;
  private commentOrchestrator: CommentOrchestrator;

  constructor() {
    this.commentService = new CommentService();
    this.commentOrchestrator = new CommentOrchestrator();
    this.initializeRouter();
  }

  private initializeRouter(): void {
    this.router.post(
      "/create",
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER, ENUM_USER_ROLES.TEAM_MEMBER),
      this.createComment
    );
    this.router.get(
      "/comments",
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER, ENUM_USER_ROLES.TEAM_MEMBER),
      this.getComments
    );
    // this.router.get(
    //   "/:commentId",
    //   authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER, ENUM_USER_ROLES.TEAM_MEMBER),
    //   this.getCommentById
    // );
    this.router.get(
      "/:subtaskId",
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER, ENUM_USER_ROLES.TEAM_MEMBER),
      this.getCommentBySubtaskId
    );
    this.router.put(
      "/",
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER, ENUM_USER_ROLES.TEAM_MEMBER),
      this.updateComment
    );
    this.router.delete(
      "/:commentId",
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER, ENUM_USER_ROLES.TEAM_MEMBER),
      this.deleteComment
    );
  }

  private createComment = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const commentData: Partial<IComment> = req.body as Partial<IComment>;
    const requesterUserId = req.user?.userId as string;
    const comment = await this.commentOrchestrator.createComment(requesterUserId, commentData);
    successResponse(res, { data: comment, message: "Comment created successfully" });
  });

  private getComments = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const subtaskQueryFilter = req.query.filters;
    const filter = filtersToMongooseQuery(JSON.parse(subtaskQueryFilter ? String(subtaskQueryFilter) : "{}"));
    console.log(filter), "filter";
    if (!filter) throw new BadRequestError("Invalid filter");
    const comments = await this.commentService.getComments(filter);
    successResponse(res, { data: comments, message: "Comments fetched successfully" });
  });

  // private getCommentById = asyncHandler(async (req: ExtendedRequest, res: Response) => {
  //   const commentId = req.params.commentId;
  //   const comment = await this.commentService.getCommentById(commentId);
  //   successResponse(res, { data: comment, message: "Comment fetched successfully" });
  // });

  private getCommentBySubtaskId = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const subtaskId = req.params.subtaskId;
    const comments = await this.commentService.getCommentBySubtaskId(subtaskId);
    successResponse(res, { data: comments, message: "Comment fetched successfully" });
  });

  private updateComment = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const commentData: Partial<IComment> = req.body as Partial<IComment>;
    const comment = await this.commentOrchestrator.updateComment(commentData);
    successResponse(res, { data: comment, message: "Comment updated successfully" });
  });

  private deleteComment = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const commentId = req.params.commentId;
    await this.commentOrchestrator.deleteComment(commentId);
    successResponse(res, { message: "Comment deleted successfully" });
  });
}
