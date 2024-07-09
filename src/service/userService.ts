import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../interfaces/userInterfaces";
import {
  getAllUsers,
  getUserById,
  getUserByEmail,
  addUser,
  generateNextUserId,
} from "../model/userModel";
import config from "../config";

const { secretKey, refreshSecretKey } = config;

const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

export const fetchUsers = (): User[] => getAllUsers();

export const fetchUserById = (id: number): User | undefined => getUserById(id);

export const fetchUserByEmail = (email: string): User | undefined =>
  getUserByEmail(email);

export const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: generateNextUserId(),
    name,
    email,
    password: hashedPassword,
  };
  return addUser(newUser);
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
