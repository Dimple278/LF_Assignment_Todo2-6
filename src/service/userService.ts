import bcrypt from "bcryptjs";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
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

const { secretKey, refreshSecretKey } = config;

export const fetchUsers = (): User[] => getAllUsers();

export const fetchUserById = (id: number): User | undefined => getUserById(id);

export const fetchUserByEmail = (email: string): User | undefined =>
  getUserByEmail(email);

export const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<Omit<User, "password">> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: generateNextUserId(),
    name,
    email,
    password: hashedPassword,
    role: "",
  };
  const addedUser = addUser(newUser);
  const { password: _password, ...response } = addedUser;
  return response;
};

export const updateUser = async (
  id: number,
  updateData: Partial<User>
): Promise<Omit<User, "password"> | null> => {
  const user = updateUserModel(id, updateData);
  if (!user) {
    throw new ApiError(404, `User with ID ${id} not found`);
  }
  const { password, ...response } = user;
  return response;
};

export const deleteUser = (id: number): User | null => {
  const user = deleteUserModel(id);
  if (!user) {
    throw new ApiError(404, `User with ID ${id} not found`);
  }
  return user;
};

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
