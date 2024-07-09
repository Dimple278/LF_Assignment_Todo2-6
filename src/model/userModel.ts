import fs from "fs";
import path from "path";
import { User } from "../interfaces/userInterfaces";

const usersFilePath = path.join(__dirname, "../../data/users.json");

let users: User[] = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
let nextUserId =
  users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

export const getAllUsers = (): User[] => users;

export const getUserById = (id: number): User | undefined =>
  users.find((user) => user.id === id);

export const getUserByEmail = (email: string): User | undefined =>
  users.find((user) => user.email === email);

export const addUser = (user: User): User => {
  users.push(user);
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  return user;
};

export const generateNextUserId = (): number => nextUserId++;
