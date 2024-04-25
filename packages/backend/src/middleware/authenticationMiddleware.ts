import { NextFunction, Response } from "express";
import tokenUtils from "../features/auth/utils/tokenUtils";
import { IUser } from "features/auth/model";
import { ExtendedRequest } from "../features/users/userInterface";
import logger from "../utils/logger";
import { BadTokenError, InternalError } from "../utils/ApiError";
import ErrorResponse from "../utils/ErrorResponse";

const authenticationMiddleware = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = (req.headers.authorization || req.headers.Authorization) as string;

    console.log("token", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const authUser = (await tokenUtils.verifyAccessToken(token)) as IUser;

    if (!authUser) {
      throw new BadTokenError("Invalid token");
    }

    req.user = {
      userId: authUser.userId,
      userRole: authUser.role
    };

    return next();
  } catch (error) {
    logger.error(`Authentication Middleware Error (IP: ${req.ip})\n`, error);
    const apiError = new InternalError("Internal Server Error");
    const errorResponse = new ErrorResponse(apiError.status, apiError.message);
    res.status(errorResponse.status).json(errorResponse);
  }
};

export default authenticationMiddleware;
