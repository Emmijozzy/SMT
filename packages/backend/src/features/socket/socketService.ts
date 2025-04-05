import { Server } from "socket.io";
import { NotificationEventHandler } from "../../features/notification/notificationEventHandler";
import { SubtaskEventHandler } from "../../features/subtask/subtaskEventHandler";
import { UserService } from "../../features/users/services/userService";
import { ApiError, InternalError } from "../../utils/ApiError";
import logger from "../../utils/logger";
import { getUserIdBySocketId } from "./getUserIdBySocketId";
import { SocketUserDataType } from "./manageUserDataType";
import { TaskEventHandler } from "../../features/task/taskEventHandler";

class SocketService {
  private io!: Server;
  private static instance: SocketService;
  private connectedUsers: Map<string, SocketUserDataType> = new Map();
  private readonly userService: UserService;
  public subtaskEventHandler!: SubtaskEventHandler;
  public notificationEventHandler!: NotificationEventHandler;
  public taskEventHandler!: TaskEventHandler;

  private constructor() {
    this.userService = new UserService();
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public initialize(io: Server) {
    this.io = io;

    //initialize event handler
    this.subtaskEventHandler = new SubtaskEventHandler(this.io, this.connectedUsers);
    this.notificationEventHandler = new NotificationEventHandler(this.io, this.connectedUsers);
    this.taskEventHandler = new TaskEventHandler(this.io, this.connectedUsers);

    this.setUpListers();
  }

  private setUpListers() {
    this.io.on("connection", (socket) => {
      logger.info(`A user connected: ${socket.id}`);

      socket.on("authenticated", async (data: { userId: string }) => {
        try {
          const { userId } = data;
          if (!userId) {
            throw new InternalError("Listener: User ID is required");
          }

          //Asscociate the socket with the user
          socket.data.userId = userId;

          //increase  connetion count for this user
          const connectionCount = this.connectedUsers.get(userId)?.count || 0;
          console.log("connectionCount", this.connectedUsers, socket.data);
          this.connectedUsers.set(userId, { count: connectionCount + 1, socketId: socket.id });

          //Only update status if this is the first connection for this user
          if (connectionCount === 0) {
            //Update use status to online
            await this.userService.updateUserById(userId, { status: "online" });

            // Broadcast to other users that this user is online
            socket.broadcast.emit("user:status", { userId, status: "online" });

            logger.info(`User status changed to active: ${userId}`);
          }

          logger.info(`User authenticated: ${userId}`);
        } catch (error) {
          const errorMessage =
            error instanceof ApiError || error instanceof Error ? error.message : "An error occurred";
          logger.error(`Socket authentication error: ${errorMessage}`);
        }
      });

      socket.on("disconnect", async () => {
        try {
          logger.info(`User disconnected: ${socket.id}`);

          // Get the user ID from the socket data
          let userId = socket.data.userId;
          if (!userId) {
            console.log("Socket data:", socket.id);
            console.log(this.connectedUsers);
            userId = getUserIdBySocketId(this.connectedUsers, socket.id);
            console.log("User ID from socket data:", userId);
            if (!userId) {
              logger.error(`User disconnected: ${socket.id}`);
              return;
            }
          }

          //Decrease connection count for this user
          const userConnection = this.connectedUsers.get(userId);
          const connectionCount = userConnection?.count || 0;

          if (userConnection) {
            userConnection.count = connectionCount - 1;
          }

          if (connectionCount <= 1) {
            // Update user status to offline
            await this.userService.updateUserById(userId, { status: "offline" });

            // Broadcast to other users that this user is offline
            socket.broadcast.emit("user:status", { userId, status: "offline" });

            logger.info(`User status changed to offline: ${userId}`);
          }

          logger.info(`User disconnected: ${userId}`);
        } catch (error) {
          const errorMessage =
            error instanceof ApiError || error instanceof Error ? error.message : "An error occurred";
          logger.error(`Socket disconnection error: ${errorMessage}`);
        }
      });
    });
  }

  public emitUserStatus(userId: string, status: "online" | "offline") {
    if (this.io) {
      this.io.emit("user:status", { userId, status });
    }
  }
}

export default SocketService.getInstance();
