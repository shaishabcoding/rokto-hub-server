class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    stack?: string
  ) {
    super(message);

    this.name = "AppError";

    Error?.captureStackTrace(this, this.constructor);

    this.stack = stack || this.stack || "";
  }
}

export default AppError;
