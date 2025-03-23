import { Server } from "socket.io";
import { SocketUserDataType } from "../../features/socket/manageUserDataType";
import logger from "../../utils/logger";
import { INotification } from "./notification";

export class NotificationEventHandler {
  constructor(
    private io: Server,
    private connectedUsers: Map<string, SocketUserDataType>
  ) {
    this.io = io;
    this.connectedUsers = connectedUsers;
  }

  public emitNewNotification(notification: INotification, userId: string): void {
    const userData = this.connectedUsers.get(userId);

    if (!userData) {
      logger.error(`No connected user found for assigneeId: ${userId}`);
      return; // Early return if user data is not found
    }

    const { socketId } = userData;

    if (socketId) {
      this.io.to(socketId).emit("newNotification", notification);
    }
  }
}
