import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import mongoose from "mongoose";
import Controller from "./Interface/controller.interface";
import { corsOptions } from "./config/corsOptions";
// import { logIniit } from "./utils/logger";
import logger from "./utils/logger";

class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[] | undefined, port: number) {
    this.express = express();
    this.port = port;

    // logIniit();
    logger.info("Application started");
    logger.warn("Potential issue detected");
    logger.error("An error occurred");
    this.initialiseMiddleWare();
  }

  private initialiseMiddleWare(): void {
    this.express.use(helmet());
    this.express.use(cors(corsOptions));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  // private initialiseDatabaseConnection(): void {}

  public init(): void {
    this.express.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
