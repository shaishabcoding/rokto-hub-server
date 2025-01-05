import { RequestHandler as RH } from "express";

/**
 * A higher-order function that wraps an asynchronous route handler (middleware) and catches any errors
 * that occur during its execution. If an error occurs, it is passed to the next middleware function.
 *
 * @param fn - The asynchronous route handler function to wrap.
 * @returns A wrapped version of the provided route handler function with error handling.
 */
const catchAsync =
  (fn: RH): RH =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export default catchAsync;
