import { RequestHandler as RH } from "express";

const catchAsync =
  (fn: RH): RH =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export default catchAsync;
