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
import ApiError from "../error/apiError";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../error/badRequestError";
import notFoundError from "../error/notFoundError";

export const fetchUsers = (): User[] => getAllUsers();

export const fetchUserById = (id: number): User | undefined => getUserById(id);

export const fetchUserByEmail = (email: string): User | undefined =>
  getUserByEmail(email);

export const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<Omit<User, "password">> => {
  if (fetchUserByEmail(email)) {
    throw new BadRequestError("Email already in use");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: generateNextUserId(),
    name,
    email,
    password: hashedPassword,
    role: "user",
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
    throw new notFoundError(`User with ID ${id} not found`);
  }
  const { password, ...response } = user;
  return response;
};

export const deleteUser = (id: number): User | null => {
  const user = deleteUserModel(id);
  if (!user) {
    throw new notFoundError(`User with ID ${id} not found`);
  }
  return user;
};
