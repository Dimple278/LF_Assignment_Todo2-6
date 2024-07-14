import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";
import * as authService from "../service/authService";
import loggerWithNameSpace from "../utils/logger";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../error/badRequestError";
import internalServerError from "../error/internalServerError";
import UnauthorizedError from "../error/unauthorizedError";
import ForbiddenError from "../error/forbiddenError";

const logger = loggerWithNameSpace("AuthController");

export const refreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { refreshToken } = req.body;
    logger.info("Refreshing token");
    if (!refreshToken) {
      return next(new BadRequestError("Refresh token is required"));
    }
    const tokens = authService.refreshAccessToken(refreshToken);
    if (!tokens) {
      return next(new ForbiddenError("Invalid refresh token"));
    }
    res.status(StatusCodes.OK).json(tokens);
  } catch (error) {
    logger.error("Failed to refresh access token", { error });
    next(new internalServerError("Failed to refresh access token"));
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    logger.info("User login attempt", { email });
    const user = await authService.validateUserCredentials(email, password);
    if (!user) {
      return next(new UnauthorizedError("Invalid email or password"));
    }
    const tokens = authService.generateTokens(user);
    res.status(StatusCodes.OK).json(tokens);
  } catch (error) {
    logger.error("Failed to log in user", { error });
    next(new internalServerError("Failed to log in user"));
  }
};
