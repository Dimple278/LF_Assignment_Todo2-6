import { User } from "../interfaces/userInterfaces";
import { readUsersFromFile, writeUsersToFile } from "../utils/fileUtils";

let users: User[] = readUsersFromFile();
let nextUserId =
  users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

export const getAllUsers = (): User[] => users;

export const getUserById = (id: number): User | undefined =>
  users.find((user) => user.id === id);

export const getUserByEmail = (email: string): User | undefined =>
  users.find((user) => user.email === email);

export const addUser = (user: User): User => {
  users.push(user);
  writeUsersToFile(users);
  return user;
};

export const generateNextUserId = (): number => nextUserId++;
