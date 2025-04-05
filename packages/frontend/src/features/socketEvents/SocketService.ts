/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable lines-between-class-members */
import { io, Socket } from "socket.io-client";
import log from "../../shared/utils/log";

export class SocketService {
  private socket: Socket | null = null;
  private static instance: unknown | null = null;

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance as SocketService;
  }

  public connect(/* token: string, */ userId: string) {
    const SOCKET_URL = /* process.env.SOCKET_URL || */ "http://localhost:3003";

    this.socket = io(SOCKET_URL, {
      auth: {
        // token,
        userId,
      },
    });

    this.socket.on("connect", () => {
      log("info", "Connected to socket server");
      // Emit the authentication event to the server
      this.socket?.emit("authenticated", { userId });
    });

    this.socket.on("connect_error", (error) => {
      log("error", "Socket connection error:", "SocketService", error.message);
    });

    this.socket.on("disconneting", () => {
      log("info", "Disconnected from socket server", "SocketService");
    });

    this.socket.on("reconnect", () => {
      log("info", "Reconnected to socket server", "SocketService");
    });
  }

  public getSocket() {
    return this.socket;
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export default SocketService.getInstance();
