import jwt from "jsonwebtoken";
import { IUser } from "../features/auth/authModel";
import { BadTokenError, InternalError, TokenExpiresError } from "./ApiError";

export const createAccessToken = (foundUser: Partial<IUser>): string => {
  return jwt.sign({ user: foundUser }, process.env.ACCESS_TOKEN_SECRET as jwt.Secret, { expiresIn: "5m" });
};

export const createRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET as jwt.Secret, { expiresIn: "10m" });
};

export const verifyAccessToken = async (token: string): Promise<jwt.VerifyErrors | IUser> => {
  try {
    const decoded = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as jwt.Secret,
      { complete: true } as jwt.VerifyOptions
    );
    if (typeof decoded !== "string") {
      return decoded.payload.user as IUser; // Access payload safely
    } else {
      throw new BadTokenError("Invalid token type"); // Handle unexpected string case
    }
  } catch (err: unknown) {
    if (err instanceof jwt.JsonWebTokenError) {
      if (err.message == "jwt expired") {
        throw new TokenExpiresError();
      }
      throw new BadTokenError(err.message);
    } else {
      throw new InternalError("Invalid token payload");
    }
  }
};

export const verifyRefreshToken = async (token: string): Promise<jwt.VerifyErrors | string> => {
  try {
    const decoded = await jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET as jwt.Secret,
      { complete: true } as jwt.VerifyOptions
    );

    if (typeof decoded === "string") {
      throw new InternalError("Invalid token type"); // Handle unexpected string case
    }
    return decoded.payload.id as string;
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      if (err.message == "jwt expired") {
        throw new TokenExpiresError();
      }
      throw new BadTokenError(err.message);
    } else {
      throw new InternalError("Invalid token payload");
    }
  }
};

export default {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};
