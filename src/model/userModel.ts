import { User } from "../interface/userInterfaces";
import { readFromFile, writeToFile } from "../utils/fileUtils";
import ApiError from "../utils/apiError";

let users: User[] = readFromFile("users");

export const getAllUsers = (): User[] => users;

export const getUserById = (id: number): User => {
  const user = users.find((user) => user.id === id);
  if (!user) {
    throw new ApiError(404, `User with ID ${id} not found`);
  }
  return user;
};

export const getUserByEmail = (email: string): User | undefined => {
  const user = users.find((user) => user.email === email);
  if (!user) {
    throw new ApiError(404, `User with email ${email} not found`);
  }
  return user;
};

export const addUser = (user: User): User => {
  if (users.some((existingUser) => existingUser.email === user.email)) {
    throw new ApiError(400, `User with email ${user.email} already exists`);
  }
  user.id = generateNextUserId();
  users.push(user);
  writeToFile("users", users);
  return user;
};

export const generateNextUserId = (): number => {
  const maxId =
    users.length > 0 ? Math.max(...users.map((user) => user.id)) : 0;
  return maxId + 1;
};
