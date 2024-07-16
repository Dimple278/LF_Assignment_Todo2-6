import { GetUserQuery, User } from "../interface/userInterfaces";
import { readFromFile, writeToFile } from "../utils/fileUtils";
import ApiError from "../error/apiError";
import bcrypt from "bcryptjs";
import notFoundError from "../error/notFoundError";
import { BaseModel } from "./base";

let users: User[] = readFromFile("users");

export class UserModel extends BaseModel {
  // static async create(user: User) {
  //   const userToCreate = {
  //     name: user.name,
  //     email: user.email,
  //     password: user.password,
  //     role: user.role,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   };

  //   const [createdUser] = await this.queryBuilder()
  //     .insert(userToCreate)
  //     .into("users")
  //     .returning(["id", "name", "email", "role", "createdAt", "updatedAt"]);

  //   return createdUser;
  // }

  static async create(user: User) {
    const userToCreate = {
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const [createdUser] = await this.queryBuilder()
      .insert(userToCreate)
      .into("users")
      .returning(["id", "name", "email", "createdAt", "updatedAt"]);

    return createdUser;
  }
  static async update(id: number, user: Partial<User>): Promise<User | null> {
    const userToUpdate = {
      ...user,
      updatedAt: new Date(),
    };

    await this.queryBuilder().update(userToUpdate).into("users").where({ id });

    const updatedUser = await this.queryBuilder()
      .select("id", "name", "email", "updatedAt")
      .from("users")
      .where({ id })
      .first();

    return updatedUser || null;
  }

  static async getUsers(filter: GetUserQuery): Promise<User[]> {
    const { q } = filter;
    const query = this.queryBuilder()
      .select("id", "name", "email")
      .from("users")
      .limit(filter.size)
      .offset((filter.page - 1) * filter.size);
    if (q) {
      query.whereLike("name", `%${q}%`);
    }
    const users = await query;
    return users;
  }

  static count(filter: GetUserQuery) {
    const { q } = filter;
    const query = this.queryBuilder().count("*").table("users").first();
    if (q) {
      // return users.filter(({name})=>name.includes(q));
      // query.where({ name: q });
      query.whereLike("name", `%${q}%`);
    }
    return query;
  }
}
export const generateNextUserId = (): number => {
  const maxId =
    users.length > 0 ? Math.max(...users.map((user) => user.id)) : 0;
  return maxId + 1;
};

// Check if super admin exists, if not, add one
const superAdminEmail = "superadmin@example.com";
const superAdminPassword = bcrypt.hashSync("superadminpassword", 10);
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

export const deleteUser = (id: number): User => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    throw new notFoundError(`User with ID ${id} not found`);
  }
  const [deletedUser] = users.splice(index, 1);
  writeToFile("users", users);
  return deletedUser;
};
