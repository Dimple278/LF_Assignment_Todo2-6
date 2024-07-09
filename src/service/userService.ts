import { User } from "../interfaces/userInterfaces";
import {
  getAllUsers,
  getUserById,
  getUserByEmail,
  addUser,
  generateNextUserId,
} from "../model/userModel";

export const fetchUsers = (): User[] => getAllUsers();

export const fetchUserById = (id: number): User | undefined => getUserById(id);

export const fetchUserByEmail = (email: string): User | undefined =>
  getUserByEmail(email);

export const createUser = (
  name: string,
  email: string,
  password: string
): User => {
  const newUser: User = {
    id: generateNextUserId(),
    name,
    email,
    password,
  };
  return addUser(newUser);
};
