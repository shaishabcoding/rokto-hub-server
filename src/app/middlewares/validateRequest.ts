import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";

/**
 * Middleware to validate incoming requests against a Zod schema.
 */
const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(
    async (req: Request, _res: Response, next: NextFunction) => {
      await schema.parseAsync({
        body: req.body,
        cookies: req.cookies,
      });

      next();
    }
  );
};

export default validateRequest;
