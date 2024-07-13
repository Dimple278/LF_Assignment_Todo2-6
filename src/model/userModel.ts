import { User } from "../interface/userInterfaces";
import { readFromFile, writeToFile } from "../utils/fileUtils";
import ApiError from "../error/apiError";
import bcrypt from "bcryptjs";
import notFoundError from "../error/notFoundError";

let users: User[] = readFromFile("users");

// Check if super admin exists, if not, add one
const superAdminEmail = "superadmin@example.com";
const superAdminPassword = bcrypt.hashSync("superadminpassword", 10);

export const generateNextUserId = (): number => {
  const maxId =
    users.length > 0 ? Math.max(...users.map((user) => user.id)) : 0;
  return maxId + 1;
};

if (!users.find((user) => user.email === superAdminEmail)) {
  const superAdmin: User = {
    id: generateNextUserId(),
    name: "Super Admin",
    email: superAdminEmail,
    password: superAdminPassword,
    role: "superadmin",
  };
  users.push(superAdmin);
  writeToFile("users", users);
}

export const getAllUsers = (): User[] => users;

export const getUserById = (id: number): User => {
  const user = users.find((user) => user.id === id);
  if (!user) {
    throw new ApiError(404, `User with ID ${id} not found`);
  }
  return user;
};

export const getUserByEmail = (email: string): User | undefined => {
  return users.find((user) => user.email === email);
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

export const updateUser = (
  id: number,
  updateData: Partial<User>
): User | null => {
  const user = getUserById(id);
  Object.assign(user, updateData);
  writeToFile("users", users);
  return user;
};

export const deleteUser = (id: number): User | null => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    throw new notFoundError(`User with ID ${id} not found`);
  }
  const [deletedUser] = users.splice(index, 1);
  writeToFile("users", users);
  return deletedUser;
};
