import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { User } from "../interface/userInterfaces";
import { getUserByEmail } from "../model/userModel";
import config from "../config";

const { secret, accessExpiration, refreshTokenExpiration } = config.jwt;

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
  if (!secret) {
    throw new Error("JWT secret key is not defined");
  }

  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    secret as Secret,
    { expiresIn: accessExpiration }
  );

  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    secret as Secret,
    { expiresIn: refreshTokenExpiration }
  );

  return { accessToken, refreshToken };
};

export const refreshAccessToken = (
  refreshToken: string
): { accessToken: string } | null => {
  try {
    const decoded = jwt.verify(refreshToken, secret as Secret) as JwtPayload;
    const user = getUserByEmail(decoded.email);
    if (!user) {
      return null;
    }
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      secret as Secret,
      { expiresIn: accessExpiration }
    );
    return { accessToken };
  } catch (error) {
    return null;
  }
};
