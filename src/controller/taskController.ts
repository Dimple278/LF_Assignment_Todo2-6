import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";
import * as taskService from "../service/taskService";
import { Task } from "../interface/taskInterface";

export const getAllTasks = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const tasks = taskService.fetchTasks();
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
    const task = taskService.fetchTaskById(taskId);
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
    const newTask = taskService.createTask(title, completed);
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

    const updatedTask = taskService.modifyTask(taskId, updates);
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
    const deletedTask = taskService.deleteTask(taskId);
    if (!deletedTask) {
      return next(new ApiError(404, "Task not found"));
    }
    res.json(deletedTask);
  } catch (error) {
    next(new ApiError(500, "Failed to delete task"));
  }
};
