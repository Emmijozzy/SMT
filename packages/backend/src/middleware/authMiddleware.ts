/* eslint-disable indent */
/* eslint-disable @typescript-eslint/indent */
import { NextFunction, Response } from "express";
import { IUser } from "features/auth/authModel";
import { ExtendedRequest } from "../features/users/userInterface";
import { AccessError, ApiError, BadTokenError } from "../utils/ApiError";
import errResponse from "../utils/ErrorResponse";
import logger from "../utils/logger";
import tokenUtils from "../utils/tokenUtils";

const authMiddleware =
  (...requiredRoles: string[]) =>
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = (req.headers.authorization || req.headers.Authorization) as string;

      // //console.log("token", authHeader);

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AccessError("You are not authorized");
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
    } catch (e: unknown) {
      const error = e as ApiError;
      if (error instanceof ApiError) {
        errResponse(res, {
          status: error.status,
          message: error.message
        });
      } else {
        throw new AccessError("Error authorizing user");
      }

      logger.error(`Authentication Middleware Error (IP: ${req.ip})\n ${error.message}`);
    }
  };

export default authMiddleware;
