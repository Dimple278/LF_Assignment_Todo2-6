import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";
import logger from "../utils/logger";

// Error handler middleware
export default function errorMiddlewarer(
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  // logger.error("Handling error", { statusCode, message, error: err });
  res.status(statusCode).json({
    error: {
      message,
      statusCode,
    },
  });
}
