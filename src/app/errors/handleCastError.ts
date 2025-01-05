import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";
import { StatusCodes } from "http-status-codes";

const handleCastError = ({
  path,
  message,
}: mongoose.Error.CastError): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path,
      message,
    },
  ];

  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message,
    errorSources,
  };
};

export default handleCastError;
