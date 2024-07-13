import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";
import * as userService from "../service/userService";
import loggerWithNameSpace from "../utils/logger";
import { StatusCodes } from "http-status-codes";

const logger = loggerWithNameSpace("UserController");

export const getUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const userId = parseInt(req.params.id);

    logger.info("Fetching user", { userId });

    const user = userService.fetchUserById(userId);
    if (!user) {
      return next(new ApiError(StatusCodes.NOT_FOUND, "User not found"));
    }
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    logger.error("Failed to fetch user", { error });
    next(error);
  }
};

export const getAllUsers = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    logger.info("Fetching all users");
    const users = userService.fetchUsers();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    logger.error("Failed to fetch users", { error });
    next(error);
  }
};

export const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    logger.info("Creating User");
    const newUser = await userService.createUser(name, email, password);
    res.status(StatusCodes.CREATED).json(newUser);
  } catch (error) {
    logger.error("Failed to create user");
    next(error);
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
    logger.info("Updating user", { userId, updateData });
    const updatedUser = await userService.updateUser(userId, updateData);
    res.status(StatusCodes.OK).json(updatedUser);
  } catch (error) {
    logger.error("Failed to update user", { error });
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    logger.info("Deleting user", { userId });
    const deletedUser = userService.deleteUser(userId);
    res.status(StatusCodes.OK).json(deletedUser);
  } catch (error) {
    logger.error("Failed to delete user", { error });
    next(error);
  }
};
