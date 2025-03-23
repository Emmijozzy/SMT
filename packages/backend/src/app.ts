import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import SocketService from "./features/socket/socketService";
import helmet from "helmet";
import { createServer } from "http";
import { Server } from "socket.io";
import IController from "./Interface/controller";
import { corsOptions } from "./config/corsOptions";
import { connectDB } from "./database";
import errorMiddleware from "./middleware/errorMiddleware";
import logger from "./utils/logger";

class App {
  public express: Application = express();
  public server = createServer(this.express);
  constructor(
    public controllers: IController[] | undefined,
    public port: number
  ) {
    this.initialiseMiddleWare();
    this.initialiseRouters();
    this.initialiseErrorHandling();
    process.on("uncaughtException", (e) => {
      logger.error(e);
    });
  }

  private connectListeners(): void {
    const allowedOrigins: string[] = process.env.ALLOWED_ORIGINS?.split(",") || [];
    const io = new Server(this.server, {
      cors: {
        origin: allowedOrigins
        // methods: ["GET", "POST"]
      }
    });

    SocketService.initialize(io);

    this.server.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private initialiseMiddleWare(): void {
    this.express.use(helmet());
    this.express.use(cors(corsOptions));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
    this.express.use(cookieParser());
  }

  private initialiseRouters(): void {
    if (this.controllers) {
      this.controllers.map((controller) => {
        this.express.use(controller.path, controller.router);
      });
    }
  }

  private initialiseErrorHandling(): void {
    this.express.use(errorMiddleware);
  }

  private async initialiseDatabaseConnection(): Promise<void> {
    await connectDB();
  }

  public init(): void {
    this.initialiseDatabaseConnection().then(() => {
      this.connectListeners();
    });
  }
}

export default App;
