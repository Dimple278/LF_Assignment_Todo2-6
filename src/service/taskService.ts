import { Task } from "../interface/taskInterface";
import {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  removeTask,
  generateNextId,
} from "../model/taskModel";

export const fetchTasks = (userId: number): Task[] => getAllTasks(userId);

export const fetchTaskById = (id: number, userId: number): Task | null =>
  getTaskById(id, userId);

export const createTask = (
  title: string,
  completed: boolean,
  userId: number
): Task => {
  const newTask: Task = {
    id: generateNextId(),
    title,
    completed: completed ?? false,
    userId,
  };
  return addTask(newTask);
};

export const modifyTask = (
  id: number,
  updates: Partial<Pick<Task, "title" | "completed">>,
  userId: number
): Task | null => {
  const task = getTaskById(id, userId);
  if (!task) return null;

  Object.keys(updates).forEach((key) => {
    const prop = key as keyof Pick<Task, "title" | "completed">;
    if (updates[prop] !== undefined) {
      (task[prop] as string | boolean) = updates[prop];
    }
  });

  return updateTask(task);
};

export const deleteTask = (id: number, userId: number): Task | null =>
  removeTask(id, userId);
