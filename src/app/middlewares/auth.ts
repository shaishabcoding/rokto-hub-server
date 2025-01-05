import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import { TTokenType, verifyToken } from "../modules/auth/Auth.utils";
import User from "../modules/user/User.model";
import { StatusCodes } from "http-status-codes";
export type TRole = "ADMIN" | "USER" | "SUPER_ADMIN";

export const auth = (roles: TRole[], type: TTokenType = "access") => {
  return catchAsync(
    async (req: Request, _res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      if (!token) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Access Denied!");
      }

      const { email } = verifyToken(token, type);

      const user = await User.findOne({
        email,
      }).select("+password");

      if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
      }

      if (user.status !== "ACTIVE") {
        throw new AppError(
          StatusCodes.FORBIDDEN,
          "Account is not active. Please contact support."
        );
      }

      if (
        roles.length &&
        !["SUPER_ADMIN"].concat(...roles).includes(user?.role)
      )
        throw new AppError(403, "Permission denied");

      req.user = user;
      next();
    }
  );
};
