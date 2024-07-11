import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";
import { StatusCodes } from "http-status-codes";

const errorMiddleware = (
  err: ApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: "Something went wrong",
  });
};

export default errorMiddleware;
