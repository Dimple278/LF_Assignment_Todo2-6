import { Task } from "../interface/taskInterface";
import {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  removeTask,
  generateNextId,
} from "../model/taskModel";

export const fetchTasks = (): Task[] => getAllTasks();

export const fetchTaskById = (id: number): Task | undefined => getTaskById(id);

export const createTask = (title: string, completed: boolean): Task => {
  const newTask: Task = {
    id: generateNextId(),
    title,
    completed,
  };
  return addTask(newTask);
};

export const modifyTask = (
  id: number,
  updates: Partial<Pick<Task, "title" | "completed">>
): Task | null => {
  const task = getTaskById(id);
  if (!task) return null;

  Object.keys(updates).forEach((key) => {
    const prop = key as keyof Pick<Task, "title" | "completed">;
    if (updates[prop] !== undefined) {
      (task[prop] as string | boolean) = updates[prop];
    }
  });

  return updateTask(task);
};

export const deleteTask = (id: number): Task | null => removeTask(id);
