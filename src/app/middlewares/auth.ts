import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import { TTokenType, verifyToken } from "../modules/auth/Auth.utils";
import User from "../modules/user/User.model";
import { StatusCodes } from "http-status-codes";
import { TUserRole } from "../modules/user/User.interface";

/**
 * Middleware to authenticate and authorize users based on their role and token type.
 *
 * @param {TUserRole[]} [roles=[]] - An array of allowed user roles. Defaults to an empty array (any role is permitted if no roles are specified).
 * @param {TTokenType} [tokenType="access"] - The type of token to verify ('access' or 'refresh'). Defaults to 'access'.
 * @returns {Function} An Express middleware function for authentication and authorization.
 */
export const auth = (
  roles: TUserRole[] = [],
  tokenType: TTokenType = "access"
) =>
  catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
    // Extract the token from the Authorization header
    const token = req.headers.authorization;
    if (!token) {
      // If no token is found, throw an "Unauthorized" error
      throw new AppError(StatusCodes.UNAUTHORIZED, "Access Denied!");
    }

    // Verify the token and decode the user's email
    const { email } = verifyToken(token, tokenType);

    // Find the user in the database using the email from the token
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      // If the user is not found, throw a "User not found" error
      throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
    }

    // Check if the user's account is active
    if (user.status !== "ACTIVE") {
      // If the account is not active, throw a "Forbidden" error
      throw new AppError(StatusCodes.FORBIDDEN, "Account is not active.");
    }

    // Attach the authenticated user to the request object for later use
    req.user = user;

    // Allow admins to bypass role-based authorization
    if (user.role === "ADMIN") {
      return next();
    }

    // Check if the user's role is included in the list of allowed roles
    if (!roles.includes(user.role)) {
      // If the user's role is not allowed, throw a "Permission denied" error
      throw new AppError(StatusCodes.FORBIDDEN, "Permission denied!");
    }

    // Proceed to the next middleware
    next();
  });
