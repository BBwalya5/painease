import { env } from "../config/env.js";
import { HttpError } from "../utils/httpError.js";

export function errorHandler(error, _request, response, _next) {
  const statusCode = error instanceof HttpError ? error.statusCode : 500;
  const message =
    error instanceof HttpError
      ? error.message
      : "Internal server error";

  const body = {
    success: false,
    error: {
      message: statusCode === 500 && env.isProduction ? "Internal server error" : message,
      statusCode,
    },
  };

  if (!env.isProduction && error instanceof Error) {
    body.error.stack = error.stack;
  }

  response.status(statusCode).json(body);
}
