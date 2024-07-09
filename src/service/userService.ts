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
  };
  const addedUser = addUser(newUser);
  const { password: _password, ...response } = addedUser;
  return response;
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
