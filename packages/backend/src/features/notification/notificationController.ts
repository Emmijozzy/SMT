import { Request, Response, Router } from "express";
import successResponse from "../../utils/successResponse";
import { ENUM_USER_ROLES } from "../../features/users/enumUserRoles";
import IController from "../../Interface/controller";
import authMiddleware from "../../middleware/authMiddleware";
import asyncHandler from "../../utils/asyncHandler";
import NotificationService from "./notificationService";

export default class NotificationController implements IController {
  public path = "/notification";
  public router = Router();
  private notificationService: NotificationService;

  constructor() {
    this.notificationService = new NotificationService();
    this.initializeRouter();
  }

  private initializeRouter(): void {
    this.router.get(
      "/:recipientId",
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER, ENUM_USER_ROLES.TEAM_MEMBER),
      this.getNotificationsByRecipientId
    );
    this.router.put(
      "/:notificationId/read",
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER, ENUM_USER_ROLES.TEAM_MEMBER),
      this.markNotificationAsRead
    );
    this.router.put(
      "/:notificationId/unread",
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER, ENUM_USER_ROLES.TEAM_MEMBER),
      this.markNotificationAsUnread
    );
    this.router.delete(
      "/:notificationId/delete",
      authMiddleware(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.MANAGER, ENUM_USER_ROLES.TEAM_MEMBER),
      this.deleteNotification
    );
  }

  private getNotificationsByRecipientId = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const recipientId = req.params.recipientId;
    const notifications = await this.notificationService.getNotificationsByRecipientId(recipientId);
    successResponse(res, {
      message: "Notifications retrieved successfully",
      data: notifications
    });
  });

  private markNotificationAsRead = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const notificationId = req.params.notificationId;
    await this.notificationService.markNotificationAsRead(notificationId);
    successResponse(res, {
      message: "Notification marked as read",
      data: null
    });
  });

  private markNotificationAsUnread = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const notificationId = req.params.notificationId;
    await this.notificationService.markNotificationAsUnread(notificationId);
    successResponse(res, {
      message: "Notification marked as unread",
      data: null
    });
  });

  private deleteNotification = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const notificationId = req.params.notificationId;
    await this.notificationService.deleteNotificationById(notificationId);
    successResponse(res, {
      message: "Notification deleted successfully",
      data: null
    });
  });

  // private getNotificationById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  //   const notificationId = req.params.notificationId;
  //   const notification = await this.notificationService.getNotificationById(notificationId);
  //   res.status(200).json(notification);
  // });
}
