import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";
import { StatusCodes } from "http-status-codes";

const handleZodError = ({ issues }: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = issues.map(
    ({ path, message }: ZodIssue) => {
      return {
        path: path[path.length - 1],
        message,
      };
    }
  );

  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: "Validation Error",
    errorSources,
  };
};

export default handleZodError;
