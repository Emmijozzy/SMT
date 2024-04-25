import IApiError from "Interface/ApiError";
import { environment } from "../config";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import logger from "../utils/logger";

const errorMiddleware = (error: IApiError, req: Request, res: Response, next: NextFunction): void => {
  if (error instanceof ApiError) {
    if (environment === "development") {
      error.log(req);
    }

    error.send(res);
  } else {
    logger.error(`500 - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`, error);
    if (environment === "development") {
      res.status(500).json({ status: 500, message: error.message });
    }
  }
};

export default errorMiddleware;
