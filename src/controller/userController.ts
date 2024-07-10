import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";
import * as userService from "../service/userService";
import loggerWithNameSpace from "../logger";

const logger = loggerWithNameSpace("UserController");

export const getUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const userId = parseInt(req.params.id);

    logger.info("Called getUser");

    const user = userService.fetchUserById(userId);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }
    res.json(user);
  } catch (error) {
    next(new ApiError(500, "Failed to fetch user"));
  }
};

export const getAllUsers = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const users = userService.fetchUsers();
    res.json(users);
  } catch (error) {
    next(new ApiError(500, "Failed to fetch users"));
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await userService.validateUserCredentials(email, password);
    if (!user) {
      return next(new ApiError(401, "Invalid email or password"));
    }
    const tokens = userService.generateTokens(user);
    res.json(tokens);
  } catch (error) {
    next(new ApiError(500, "Failed to log in user"));
  }
};

export const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    if (userService.fetchUserByEmail(email)) {
      return next(new ApiError(400, "Email already in use"));
    }
    const newUser = await userService.createUser(name, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    next(new ApiError(500, "Failed to create user"));
  }
};

export const refreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return next(new ApiError(400, "Refresh token is required"));
    }
    const tokens = userService.refreshAccessToken(refreshToken);
    if (!tokens) {
      return next(new ApiError(403, "Invalid refresh token"));
    }
    res.json(tokens);
  } catch (error) {
    next(new ApiError(500, "Failed to refresh access token"));
  }
};
