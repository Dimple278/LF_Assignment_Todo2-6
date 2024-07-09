import { Task } from "../interface/taskInterface";
import { readFromFile, writeToFile } from "../utils/fileUtils";

let tasks: Task[] = readFromFile("tasks");
let nextId =
  tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;

export const getAllTasks = (): Task[] => tasks;

export const getTaskById = (id: number): Task | undefined =>
  tasks.find((task) => task.id === id);

export const addTask = (task: Task): Task => {
  tasks.push(task);
  writeToFile("tasks", tasks);
  return task;
};

export const updateTask = (task: Task): Task | null => {
  const index = tasks.findIndex((t) => t.id === task.id);
  if (index !== -1) {
    tasks[index] = task;
    writeToFile("tasks", tasks);
    return task;
  }
  return null;
};

export const removeTask = (id: number): Task | null => {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return null;
  const [deletedTask] = tasks.splice(index, 1);
  writeToFile("tasks", tasks);
  return deletedTask;
};

export const generateNextId = (): number => nextId++;
