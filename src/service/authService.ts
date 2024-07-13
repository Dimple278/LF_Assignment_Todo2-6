import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { User } from "../interface/userInterfaces";
import {
  getAllUsers,
  getUserById,
  getUserByEmail,
  addUser,
  updateUser as updateUserModel,
  deleteUser as deleteUserModel,
  generateNextUserId,
} from "../model/userModel";
import config from "../config";
import ApiError from "../error/apiError";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../error/badRequestError";

const { secretKey, refreshSecretKey } = config;

export const validateUserCredentials = async (
  email: string,
  password: string
): Promise<User | null> => {
  const user = getUserByEmail(email);
  if (!user) return null;
  const isValidPassword = await bcrypt.compare(password, user.password);
  return isValidPassword ? user : null;
};

export const generateTokens = (user: User) => {
  if (!secretKey || !refreshSecretKey) {
    throw new Error("Secret keys are not defined");
  }

  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    secretKey as Secret,
    { expiresIn: "1h" }
  );
  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    refreshSecretKey as Secret,
    { expiresIn: "7d" }
  );
  return { accessToken, refreshToken };
};

export const refreshAccessToken = (
  refreshToken: string
): { accessToken: string } | null => {
  try {
    const decoded = jwt.verify(
      refreshToken,
      refreshSecretKey as Secret
    ) as JwtPayload;
    const user = getUserByEmail(decoded.email);
    if (!user) {
      return null;
    }
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      secretKey as Secret,
      { expiresIn: "1h" }
    );
    return { accessToken };
  } catch (error) {
    return null;
  }
};
