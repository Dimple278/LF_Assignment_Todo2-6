import { Response, NextFunction } from "express";
import * as taskService from "../service/taskService";
import { Task } from "../interface/taskInterface";
import { AuthRequest } from "../middleware/authMIddleware";
import { StatusCodes } from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("TaskController");

export const getAllTasks = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    logger.info("Fetching all tasks", { userId: req.user!.id });

    const tasks = taskService.fetchTasks(req.user!.id);

    res.status(StatusCodes.OK).json(tasks);
  } catch (error) {
    logger.error("Failed to fetch tasks", { error });
    next(error);
  }
};

export const getTask = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const taskId = parseInt(req.params.id);
    logger.info("Fetching task", { userId: req.user!.id, taskId });
    const task = taskService.fetchTaskById(taskId, req.user!.id);
    res.status(StatusCodes.OK).json(task);
  } catch (error) {
    logger.error("Failed to fetch task", { error });
    next(error);
  }
};

export const createTask = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { title, completed } = req.body;
    logger.info("Creating task", { userId: req.user!.id, title, completed });
    const task = taskService.createTask(title, completed, req.user!.id);
    res.status(StatusCodes.CREATED).json(task);
  } catch (error) {
    logger.error("Failed to create task", { error });
    next(error);
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
    logger.info("Updating task", { userId: req.user!.id, taskId, updates });
    const updatedTask = taskService.modifyTask(taskId, updates, req.user!.id);
    res.status(StatusCodes.OK).json(updatedTask);
  } catch (error) {
    logger.error("Failed to update task", { error });
    next(error);
  }
};

export const deleteTask = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const taskId = parseInt(req.params.id);
    logger.info("Deleting task", { userId: req.user!.id, taskId });
    const deletedTask = taskService.deleteTask(taskId, req.user!.id);
    res.status(StatusCodes.OK).json(deletedTask);
  } catch (error) {
    logger.error("Failed to delete task", { error });
    next(error);
  }
};
