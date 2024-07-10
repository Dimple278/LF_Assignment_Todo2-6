import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";
import * as userService from "../service/userService";
import loggerWithNameSpace from "../logger";
import { StatusCodes } from "http-status-codes";

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
      return next(new ApiError(StatusCodes.NOT_FOUND, "User not found"));
    }
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(
      new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to fetch user")
    );
  }
};

export const getAllUsers = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const users = userService.fetchUsers();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    next(
      new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to fetch users")
    );
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
      return next(
        new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password")
      );
    }
    const tokens = userService.generateTokens(user);
    res.status(StatusCodes.OK).json(tokens);
  } catch (error) {
    next(
      new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to log in user")
    );
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
      return next(
        new ApiError(StatusCodes.BAD_REQUEST, "Email already in use")
      );
    }
    const newUser = await userService.createUser(name, email, password);
    res.status(StatusCodes.CREATED).json(newUser);
  } catch (error) {
    next(
      new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to create user")
    );
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    const updateData = req.body;

    const updatedUser = await userService.updateUser(userId, updateData);
    if (!updatedUser) {
      return next(
        new ApiError(StatusCodes.NOT_FOUND, `User with ID ${userId} not found`)
      );
    }
    res.status(StatusCodes.OK).json(updatedUser);
  } catch (error) {
    next(
      new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to update user")
    );
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);

    const deletedUser = userService.deleteUser(userId);
    if (!deletedUser) {
      return next(
        new ApiError(StatusCodes.NOT_FOUND, `User with ID ${userId} not found`)
      );
    }
    res.status(StatusCodes.OK).json(deletedUser);
  } catch (error) {
    next(
      new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to delete user")
    );
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
      return next(
        new ApiError(StatusCodes.BAD_REQUEST, "Refresh token is required")
      );
    }
    const tokens = userService.refreshAccessToken(refreshToken);
    if (!tokens) {
      return next(new ApiError(StatusCodes.FORBIDDEN, "Invalid refresh token"));
    }
    res.status(StatusCodes.OK).json(tokens);
  } catch (error) {
    next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to refresh access token"
      )
    );
  }
};
