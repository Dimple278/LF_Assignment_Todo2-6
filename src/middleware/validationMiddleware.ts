import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";

export const validateTaskId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const taskId = parseInt(req.params.id);
  if (isNaN(taskId)) {
    return next(new ApiError(400, "Invalid task ID"));
  }
  next();
};

export const validatePostTaskBody = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title, completed } = req.body;
  if (typeof title !== "string") {
    return next(
      new ApiError(
        400,
        "Invalid task data: title is required and must be a string"
      )
    );
  }
  if (completed !== undefined && typeof completed !== "boolean") {
    return next(
      new ApiError(400, "Invalid task data: completed must be a boolean")
    );
  }
  next();
};

export const validatePutTaskBody = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title, completed } = req.body;
  if (title !== undefined && typeof title !== "string") {
    return next(new ApiError(400, "Invalid task data: title must be a string"));
  }
  if (completed !== undefined && typeof completed !== "boolean") {
    return next(
      new ApiError(400, "Invalid task data: completed must be a boolean")
    );
  }
  next();
};

export const validateUserBody = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, email, password } = req.body;
  if (typeof name !== "string") {
    return next(
      new ApiError(
        400,
        "Invalid user data: name is required and must be a string"
      )
    );
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof email !== "string" || !emailRegex.test(email)) {
    return next(
      new ApiError(400, "Invalid user data: valid email is required")
    );
  }
  if (typeof password !== "string" || password.length < 6) {
    return next(
      new ApiError(
        400,
        "Invalid user data: password is required and must be at least 6 characters long"
      )
    );
  }
  next();
};
