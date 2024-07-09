import { Task } from "../interface/taskInterface";
import * as taskModel from "../model/taskModel";

export const fetchTasks = (): Task[] => taskModel.getAllTasks();

export const fetchTaskById = (id: number): Task | undefined =>
  taskModel.getTaskById(id);

export const createTask = (title: string, completed: boolean): Task => {
  const newTask: Task = {
    id: taskModel.generateNextId(),
    title,
    completed,
  };
  return taskModel.addTask(newTask);
};

export const modifyTask = (
  id: number,
  updates: Partial<Pick<Task, "title" | "completed">>
): Task | null => {
  const task = taskModel.getTaskById(id);
  if (!task) return null;

  Object.keys(updates).forEach((key) => {
    const prop = key as keyof Pick<Task, "title" | "completed">;
    if (updates[prop] !== undefined) {
      (task[prop] as string | boolean) = updates[prop];
    }
  });

  return taskModel.updateTask(task);
};

export const deleteTask = (id: number): Task | null => taskModel.removeTask(id);
