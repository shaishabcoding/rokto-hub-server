import { StatusCodes } from "http-status-codes";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err?.message.match(/"([^"]*)"/);

  const message = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: "",
      message: `${message} is already exists`,
    },
  ];

  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: err?.message,
    errorSources,
  };
};

export default handleDuplicateError;
