import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";
import * as taskService from "../service/taskService";
import { Task } from "../interface/taskInterface";
import { AuthRequest } from "../middleware/authMIddleware";

export const getAllTasks = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const tasks = taskService.fetchTasks(req.user!.id);
    res.json(tasks);
  } catch (error) {
    next(new ApiError(500, "Failed to fetch tasks"));
  }
};

export const getTask = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const taskId = parseInt(req.params.id);
    const task = taskService.fetchTaskById(taskId, req.user!.id);
    if (!task) {
      return next(new ApiError(404, "Task not found"));
    }
    res.json(task);
  } catch (error) {
    next(new ApiError(500, "Failed to fetch task"));
  }
};

export const createTask = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { title, completed } = req.body;
    const task = taskService.createTask(title, completed, req.user!.id);
    res.status(201).json(task);
  } catch (error) {
    next(new ApiError(500, "Failed to create task"));
  }
};

export const updateTask = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const taskId = parseInt(req.params.id);
    const updates: Partial<Pick<Task, "title" | "completed">> = req.body;

    const updatedTask = taskService.modifyTask(taskId, updates, req.user!.id);
    if (!updatedTask) {
      return next(new ApiError(404, "Task not found"));
    }
    res.json(updatedTask);
  } catch (error) {
    next(new ApiError(500, "Failed to update task"));
  }
};

export const deleteTask = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const taskId = parseInt(req.params.id);
    const deletedTask = taskService.deleteTask(taskId, req.user!.id);
    if (!deletedTask) {
      return next(new ApiError(404, "Task not found"));
    }
    res.json(deletedTask);
  } catch (error) {
    next(new ApiError(500, "Failed to delete task"));
  }
};
