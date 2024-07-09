import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";

const regexValidationSchema = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  name: /^[a-zA-Z\s'-]+$/,
};

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
  if (typeof name !== "string" || !regexValidationSchema.name.test(name)) {
    return next(
      new ApiError(
        400,
        "Invalid user data: name is required and must be a valid string"
      )
    );
  }
  if (typeof email !== "string" || !regexValidationSchema.email.test(email)) {
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

export const validateLoginBody = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password } = req.body;
  if (typeof email !== "string" || !regexValidationSchema.email.test(email)) {
    return next(
      new ApiError(400, "Invalid login data: valid email is required")
    );
  }
  if (typeof password !== "string" || password.length < 6) {
    return next(
      new ApiError(
        400,
        "Invalid login data: password is required and must be at least 6 characters long"
      )
    );
  }
  next();
};

export const validateRefreshTokenBody = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { refreshToken } = req.body;
  if (typeof refreshToken !== "string") {
    return next(
      new ApiError(
        400,
        "Invalid refresh token data: refresh token is required and must be a string"
      )
    );
  }
  next();
};
