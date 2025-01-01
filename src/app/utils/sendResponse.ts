import { Response } from "express";

type TResponse < T > = {
  statusCode ? : number;
  message ? : string;
  data ? : T;
};

const sendResponse = <T>(res: Response, { statusCode = 200, message = "", data = "" } : TResponse<T>) =>
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });

export default sendResponse;