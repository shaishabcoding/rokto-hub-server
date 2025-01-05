import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { TBadge } from "../modules/user/User.constant";
import AppError from "../errors/AppError";
import { StatusCodes } from "http-status-codes";

export const badge = (badges: TBadge[]) => {
  return catchAsync(
    async (req: Request, _res: Response, next: NextFunction) => {
      const userBadge: TBadge = req.user?.badge;

      if (!badges.includes(userBadge)) {
        throw new AppError(
          StatusCodes.PAYMENT_REQUIRED,
          "You do not have access to this package."
        );
      }

      next();
    }
  );
};
