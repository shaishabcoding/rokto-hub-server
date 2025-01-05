import { Response } from "express";
import { StatusCodes } from "http-status-codes";

// Define a generic response type to handle response data with flexible structure.
type TResponse<T> = {
  statusCode?: number;
  message?: string;
  data?: T;
};

/**
 * Sends a JSON response with a success flag, message, and data.
 * @param res - The Express response object
 * @param response - The response data with statusCode, message, and data
 */
const sendResponse = <T>(
  res: Response,
  { statusCode = StatusCodes.OK, message = "", data }: TResponse<T>
) =>
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });

export default sendResponse;
