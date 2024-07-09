import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";
import {
  fetchUsers,
  fetchUserById,
  fetchUserByEmail,
  createUser,
} from "../service/userService";

export const getAllUsers = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const users = fetchUsers();
    res.json(users);
  } catch (error) {
    next(new ApiError(500, "Failed to fetch users"));
  }
};

export const getUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const userId = parseInt(req.params.id);
    const user = fetchUserById(userId);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }
    res.json(user);
  } catch (error) {
    next(new ApiError(500, "Failed to fetch user"));
  }
};

export const createNewUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { name, email, password } = req.body;
    if (fetchUserByEmail(email)) {
      return next(new ApiError(400, "Email already in use"));
    }
    const newUser = createUser(name, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    next(new ApiError(500, "Failed to create user"));
  }
};
