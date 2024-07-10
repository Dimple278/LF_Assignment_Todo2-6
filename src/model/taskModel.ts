import { Task } from "../interface/taskInterface";
import { readFromFile, writeToFile } from "../utils/fileUtils";
import ApiError from "../error/apiError";

let tasks: Task[] = readFromFile("tasks");

export const getAllTasks = (): Task[] => tasks;

export const getTaskById = (id: number): Task => {
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    throw new ApiError(404, `Task with ID ${id} not found`);
  }
  return task;
};

export const addTask = (task: Task): Task => {
  tasks.push(task);
  writeToFile("tasks", tasks);
  return task;
};

export const updateTask = (task: Task): Task => {
  const index = tasks.findIndex((t) => t.id === task.id);
  if (index === -1) {
    throw new ApiError(404, `Task with ID ${task.id} not found`);
  }
  tasks[index] = task;
  writeToFile("tasks", tasks);
  return task;
};

export const removeTask = (id: number): Task => {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    throw new ApiError(404, `Task with ID ${id} not found`);
  }
  const [deletedTask] = tasks.splice(index, 1);
  writeToFile("tasks", tasks);
  return deletedTask;
};

export const generateNextId = (): number => {
  const maxId =
    tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) : 0;
  return maxId + 1;
};
