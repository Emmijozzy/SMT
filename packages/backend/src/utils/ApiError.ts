import { Request, Response } from "express";
import IApiError from "Interface/ApiError";
import logger from "./logger";
/*
  Error must have

*/

enum Status {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500
}

export abstract class ApiError extends Error implements IApiError {
  public fileName?: string;

  constructor(
    public status: number,
    public message: string,
    public stack?: string,
    public filePath?: string
  ) {
    super(message);
  }

  public log(req: Request) {
    logger.error(`${this.status} - ${this.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`, this);
  }

  public send(res: Response) {
    res.status(this.status).json({ message: this.message, status: this.status, isError: true, isSuccess: false });
  }
}

export class AuthFailureError extends ApiError {
  constructor(message = "Invalid Credentials", stack?: string, fileName?: string) {
    super(Status.UNAUTHORIZED, message, stack, fileName);
  }
}

export class InternalError extends ApiError {
  constructor(message = "Internal error", stack?: string, fileName?: string) {
    super(Status.INTERNAL_ERROR, message, stack, fileName);
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "Bad Request", stack?: string, fileName?: string) {
    super(Status.BAD_REQUEST, message, stack, fileName);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Not Found", stack?: string, fileName?: string) {
    super(Status.NOT_FOUND, message, stack, fileName);
  }
}

export class NoEntryError extends ApiError {
  constructor(message = "Entry don't exists", stack?: string, fileName?: string) {
    super(Status.NOT_FOUND, message, stack, fileName);
  }
}

export class BadTokenError extends ApiError {
  constructor(message = "Invalid Token ", stack?: string, fileName?: string) {
    super(Status.FORBIDDEN, message, stack, fileName);
  }
}

export class ValidationError extends ApiError {
  constructor(message = "Invalid Token ", stack?: string, fileName?: string) {
    super(Status.BAD_REQUEST, message, stack, fileName);
  }
}

export class TokenExpiresErro extends ApiError {
  constructor(message = "Token expired", stack?: string, fileName?: string) {
    super(Status.FORBIDDEN, message, stack, fileName);
  }
}
export class AccessError extends ApiError {
  constructor(message = "Forbidden", stack?: string, fileName?: string) {
    super(Status.FORBIDDEN, message, stack, fileName);
  }
}

export class NoDataError extends ApiError {
  constructor(message = "No data available", stack?: string, fileName?: string) {
    super(Status.NOT_FOUND, message, stack, fileName);
  }
}

export class AccessTokenError extends ApiError {
  constructor(message = "Invalid access token", stack?: string, fileName?: string) {
    super(Status.FORBIDDEN, message, stack, fileName);
  }
}
