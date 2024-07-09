import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";

const errorMiddleware = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ message });
};

export default errorMiddleware;
