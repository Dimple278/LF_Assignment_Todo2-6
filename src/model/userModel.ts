import { User } from "../interfaces/userInterfaces";
import { readFromFile, writeToFile } from "../utils/fileUtils";

let users: User[] = readFromFile("users");
let nextUserId =
  users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

export const getAllUsers = (): User[] => users;

/**
 *
 * @param id
 * @returns
 */
export const getUserById = (id: number): User => {
  try {
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw Error("AMANNAN");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = (email: string): User | undefined =>
  users.find((user) => user.email === email);

export const addUser = (user: User): User => {
  users.push(user);
  writeToFile("users", users);
  return user;
};

export const generateNextUserId = (): number => nextUserId++;
