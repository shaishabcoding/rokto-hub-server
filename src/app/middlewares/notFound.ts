import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

const notFound: RequestHandler = (_req, res): any => {
  return res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "API Not Found !!",
    error: "",
  });
};

export default notFound;
