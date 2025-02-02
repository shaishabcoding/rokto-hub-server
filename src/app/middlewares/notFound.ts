import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

/**
 * Middleware to handle undefined or non-existent API routes.
 * Responds with a 404 Not Found status code and a detailed error structure.
 */
const notFound: RequestHandler = (_req, res): void => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    statusCode: StatusCodes.NOT_FOUND,
    message: "The requested API endpoint does not exist.",
    errorSources: [
      {
        path: "url",
        message: "Please check the URL and try again.",
      },
    ],
  });
};

export default notFound;
