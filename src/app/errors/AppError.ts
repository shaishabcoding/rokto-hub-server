/**
 * Custom Error Class for Application-Specific Errors.
 * Extends the built-in JavaScript Error class to include a status code and custom stack trace.
 */
class AppError extends Error {
  /**
   * Creates an instance of AppError.
   *
   * @param {number} statusCode - The HTTP status code associated with the error.
   * @param {string} message - The error message describing the issue.
   * @param {string} [stack] - Optional custom stack trace for debugging.
   */
  constructor(
    public readonly statusCode: number,
    message: string,
    stack?: string
  ) {
    super(message); // Call the parent constructor with the error message.

    this.name = "AppError"; // Set the name of the error to "AppError".

    // Capture the stack trace, pointing to this constructor.
    Error?.captureStackTrace(this, this.constructor);

    // Assign a custom stack trace or fall back to the default stack trace.
    this.stack = stack || this.stack || "";
  }
}

export default AppError;
