import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import IController from "./Interface/controller";
import { corsOptions } from "./config/corsOptions";
import errorMiddleware from "./middleware/errorMiddleware";
import { connectDB } from "./database";
import logger from "./utils/logger";

class App {
  public express: Application = express();
  constructor(
    public controllers: IController[] | undefined,
    public port: number
  ) {
    this.initialiseMiddleWare();
    this.initialiseRouters();
    this.initialiseErrorHandling();
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
      this.express.listen(this.port, () => {
        console.log(`App listening on the port ${this.port}`);
      });
    });
  }
}

export default App;
