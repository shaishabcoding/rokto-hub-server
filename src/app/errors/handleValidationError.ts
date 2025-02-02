import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";
import { StatusCodes } from "http-status-codes";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    ({
      path,
      message,
    }: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path,
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

export default handleValidationError;
