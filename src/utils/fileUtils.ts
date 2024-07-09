import fs from "fs";
import path from "path";

const tasksFilePath = path.resolve(__dirname, "../data/tasks.json");
const usersFilePath = path.resolve(__dirname, "../data/users.json");

export const readTasksFromFile = (): any => {
  const data = fs.readFileSync(tasksFilePath, "utf-8");
  return JSON.parse(data);
};

export const writeTasksToFile = (tasks: any): void => {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), "utf-8");
};

export const readUsersFromFile = (): any => {
  const data = fs.readFileSync(usersFilePath, "utf-8");
  return JSON.parse(data);
};

export const writeUsersToFile = (users: any): void => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf-8");
};
