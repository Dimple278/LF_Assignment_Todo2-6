import fs from "fs";
import path from "path";

const filePath = path.resolve(__dirname, "../data/tasks.json");

export const readTasksFromFile = (): any => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

export const writeTasksToFile = (tasks: any): void => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
};
