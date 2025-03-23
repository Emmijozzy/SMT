/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable lines-between-class-members */
import { io, Socket } from "socket.io-client";

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
      console.log("Connected to socket server");
      // Emit the authentication event to the server
      this.socket?.emit("authenticated", { userId });
    });

    this.socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    this.socket.on("disconneting", () => {
      console.log("Disconnected from socket server");
    });

    this.socket.on("reconnect", () => {
      console.log("Reconnected to socket server");
    });

    // this.socket.on("user:status", (data: { userId: string; status: string }) => {
    //   console.log("User status updated:", data);
    // });
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
