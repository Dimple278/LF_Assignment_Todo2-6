import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";
import * as userService from "../service/userService";
import loggerWithNameSpace from "../utils/logger";
import { StatusCodes } from "http-status-codes";

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
    logger.error("Failed to refresh access token", { error });
    next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to refresh access token"
      )
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
    logger.info("User login attempt", { email });
    const user = await userService.validateUserCredentials(email, password);
    if (!user) {
      return next(
        new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password")
      );
    }
    const tokens = userService.generateTokens(user);
    res.status(StatusCodes.OK).json(tokens);
  } catch (error) {
    logger.error("Failed to log in user", { error });
    next(
      new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to log in user")
    );
  }
};
