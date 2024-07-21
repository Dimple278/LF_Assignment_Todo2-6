import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";

import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("ErrorHandling");

// Error handler middleware
export function errorHandler(
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  logger.error("Handling error", { statusCode, message, error: err });
  res.status(statusCode).json({
    error: {
      message,
      statusCode,
    },
  });
}
