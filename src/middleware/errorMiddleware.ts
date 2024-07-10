import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";
import loggerWithNameSpace from "../logger";

const logger = loggerWithNameSpace("ErrorHandler");

const errorMiddleware = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.stack) {
    logger.error(err.stack);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ message });
};

export default errorMiddleware;
