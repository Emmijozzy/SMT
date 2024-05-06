import IApiError from "Interface/ApiError";
import logger from "./logger";
import { Request, Response } from "express";
import { error } from "winston";
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
  public filname?: string;

  constructor(
    public status: number,
    public message: string
  ) {
    super(message);
  }

  public log(req: Request) {
    logger.error(`${this.status} - ${this.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`, error);
  }

  public send(res: Response) {
    res.status(this.status).json({ message: this.message, status: this.status });
  }
}

export class AuthFailureError extends ApiError {
  constructor(message = "Invalid Credentials") {
    super(Status.UNAUTHORIZED, message);
  }
}

export class InternalError extends ApiError {
  constructor(message = "Internal error") {
    super(Status.INTERNAL_ERROR, message);
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "Bad Request") {
    super(Status.BAD_REQUEST, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Not Found") {
    super(Status.NOT_FOUND, message);
  }
}

export class NoEntryError extends ApiError {
  constructor(message = "Entry don't exists") {
    super(Status.NOT_FOUND, message);
  }
}

export class BadTokenError extends ApiError {
  constructor(message = "Token is invalid") {
    super(Status.FORBIDDEN, message);
  }
}

export class TokenExpiresErro extends ApiError {
  constructor(message = "Token is expired") {
    super(Status.FORBIDDEN, message);
  }
}
export class AccessError extends ApiError {
  constructor(message = "Forbidden") {
    super(Status.FORBIDDEN, message);
  }
}

export class NoDataError extends ApiError {
  constructor(message = "No data available") {
    super(Status.NOT_FOUND, message);
  }
}

export class AccessTokenError extends ApiError {
  constructor(message = "Invalid access token") {
    super(Status.FORBIDDEN, message);
  }
}
