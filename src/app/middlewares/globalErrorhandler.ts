import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../config";
import AppError from "../errors/AppError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import handleValidationError from "../errors/handleValidationError";
import handleZodError from "../errors/handleZodError";
import { TErrorSources } from "../interface/error";
import { StatusCodes } from "http-status-codes";

/**
 * Global Error Handler Middleware
 *
 * Handles all errors in the application, formats them into a standardized response,
 * and optionally logs the error stack in development mode.
 */
const globalErrorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next
): void => {
  // Default Error Response Structure
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = "An unexpected error occurred!";
  let errorSources: TErrorSources = [{ path: "", message }];

  // Structured Error Handling Logic
  switch (true) {
    case err instanceof ZodError:
      ({ statusCode, message, errorSources } = handleZodError(err));
      break;

    case err.name === "ValidationError":
      ({ statusCode, message, errorSources } = handleValidationError(err));
      break;

    case err.name === "CastError":
      ({ statusCode, message, errorSources } = handleCastError(err));
      break;

    case err.code === 11000: // MongoDB Duplicate Key Error
      ({ statusCode, message, errorSources } = handleDuplicateError(err));
      break;

    case err instanceof AppError:
      statusCode = err.statusCode || StatusCodes.BAD_REQUEST;
      message = err.message || "Application Error!";
      errorSources = [{ path: "", message }];
      break;

    case err instanceof Error: // Native JavaScript Errors
      message = err.message || "Unknown Error!";
      errorSources = [{ path: "", message }];
      break;

    default:
      // Catch-all for any unhandled error types
      message = "An unhandled error occurred!";
      errorSources = [{ path: "", message }];
  }

  // Log the error stack in development mode (optional)
  if (config.node_env === "development") {
    console.error("Error Stack:", err.stack);
  }

  // Final Error Response
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === "development" ? err.stack : undefined,
  });
};

export default globalErrorHandler;
