/* eslint-disable indent */
/* eslint-disable @typescript-eslint/indent */
import { NextFunction, Response } from "express";
import tokenUtils from "../features/auth/utils/tokenUtils";
import { IUser } from "features/auth/authModel";
import { ExtendedRequest } from "../features/users/userInterface";
import logger from "../utils/logger";
import { AccessError, AuthFailureError, BadTokenError, InternalError } from "../utils/ApiError";
import ErrorResponse from "../utils/ErrorResponse";

const authMiddleware =
  (...requiredRoles: string[]) =>
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = (req.headers.authorization || req.headers.Authorization) as string;

      // console.log("token", authHeader);

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AuthFailureError("You are not authorized");
      }

      const token = authHeader.split(" ")[1];
      const authUser = (await tokenUtils.verifyAccessToken(token)) as IUser;

      //confirm user data
      if (!authUser) {
        throw new BadTokenError("Invalid token");
      }

      //Check roles access
      if (requiredRoles.length && !requiredRoles.includes(authUser.role)) {
        throw new AccessError();
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

export default authMiddleware;
