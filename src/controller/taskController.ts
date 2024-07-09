import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";
import {
  fetchTasks,
  fetchTaskById,
  createTask,
  modifyTask,
  deleteTask,
} from "../service/taskService";
import { Task } from "../interfaces/taskInterface";

export const getAllTasks = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const tasks = fetchTasks();
    res.json(tasks);
  } catch (error) {
    next(new ApiError(500, "Failed to fetch tasks"));
  }
};

export const getTask = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const taskId = parseInt(req.params.id);
    const task = fetchTaskById(taskId);
    if (!task) {
      return next(new ApiError(404, "Task not found"));
    }
    res.json(task);
  } catch (error) {
    next(new ApiError(500, "Failed to fetch task"));
  }
};

export const createNewTask = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { title, completed = false } = req.body;
    const newTask = createTask(title, completed);
    res.status(201).json(newTask);
  } catch (error) {
    next(new ApiError(500, "Failed to create task"));
  }
};

export const updateExistingTask = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const taskId = parseInt(req.params.id);
    const updates: Partial<Pick<Task, "title" | "completed">> = req.body;

    const updatedTask = modifyTask(taskId, updates);
    if (!updatedTask) {
      return next(new ApiError(404, "Task not found"));
    }
    res.json(updatedTask);
  } catch (error) {
    next(new ApiError(500, "Failed to update task"));
  }
};

export const deleteExistingTask = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const taskId = parseInt(req.params.id);
    const deletedTask = deleteTask(taskId);
    if (!deletedTask) {
      return next(new ApiError(404, "Task not found"));
    }
    res.json(deletedTask);
  } catch (error) {
    next(new ApiError(500, "Failed to delete task"));
  }
};
