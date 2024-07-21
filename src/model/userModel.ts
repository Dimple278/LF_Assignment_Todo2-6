

import { User } from "../interface/userInterfaces";

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
import { Roles } from "../constatnts/Roles";
import { getUserQuery, User } from "../interface/User";
import { BaseModel } from "./base";

// User model class
export class UserModel extends BaseModel {
  // Function to create a user
  static async create(user: User, createdBy: User) {
    const userTOCreate = {
      name: user.name,
      email: user.email,
      password: user.password,
      createdBy: createdBy.id,
    };

    await this.queryBuilder().insert(userTOCreate).table("users");
  }

  // Function to get user by email
  static async getUserByEmail(email: string) {
    return await this.queryBuilder()
      .select("*")
      .table("users")
      .where({ email })
      .first();
  }

  // Function to get role id by role name
  static async getRoleId(role: Roles) {
    const roleId = await this.queryBuilder()
      .select("id")
      .table("roles")
      .where({ role });
    return roleId[0].id;
  }

  // Function to get name of the role by role id
  static async getRoleName(roleId: number) {
    const role = await this.queryBuilder()
      .select("role")
      .table("roles")
      .where({ id: roleId });
    return role[0].role;
  }

  // Function to get User roles by user id
  static async getUserRoles(userId: number) {
    return await this.queryBuilder()
      .select("*")
      .table("user_roles")
      .where({ userId });
  }

  // Function to get role permissions by role id
  static async getRolePermissions(roleId: number) {
    const permissionsId = await this.queryBuilder()
      .select("permission_id")
      .table("role_permissions")
      .where({ roleId: roleId });

    const permissions = await Promise.all(
      permissionsId.map(async (permission) => {
        const result = await this.queryBuilder()
          .select("permission")
          .table("permissions")
          .where({ id: permission.permissionId });
        return result[0].permission;
      })
    );

    return permissions;
  }

  // Function to create user roles
  static async createUserRoles(userId: number, roleId: number) {
    const userRoles = {
      userId: userId,
      roleId: roleId,
    };
    await this.queryBuilder().insert(userRoles).table("user_roles");
  }

  // Function to get all users
  static getUsers(filter: getUserQuery) {
    const { q, page, size } = filter;

    const query = this.queryBuilder()
      .select("id", "email", "name")
      .table("users")
      .limit(size)
      .offset((page - 1) * size);
    if (q) {
      query.whereLike("name", `%${q}%`);
    }
    return query;
  }
  // Function to count users
  static count(filter: getUserQuery) {
    const { q } = filter;
    const query = this.queryBuilder().count("*").table("users").first();

    if (q) {
      query.whereLike("name", `%${q}%`);
    }
    return query;
  }

  // Function to get user by id
  static async getUserById(id: string) {
    return await this.queryBuilder()
      .select("*")
      .table("users")
      .where({ id })
      .first();
  }

  // Function to update user
  static async update(id: string, user: User, updatedBy: User) {
    const userToUpdate = {
      name: user.name,
      email: user.email,
      password: user.password,
      updatedAt: new Date(),
      updatedBy: updatedBy.id,
    };
    const query = this.queryBuilder()
      .update(userToUpdate)
      .table("users")
      .where({ id });
    await query;
  }

  // Function to delete user
  static delete(id: string) {
    return this.queryBuilder().delete().table("users").where({ id });
  }

  // Function to delete user roles
  static deleteUserRoles(userId: string) {
    return this.queryBuilder().delete().table("user_roles").where({ userId });
  }

  // Function to delete user tasks
  static deleteUserTasks(userId: string) {
    return this.queryBuilder().delete().table("tasks").where({ userId });
  }
}
