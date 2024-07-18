import express from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../controller/task";
import { authenticate, authorize } from "../middleware/auth";
import {
  validateReqBody,
  validateReqParams,
  validateReqQuery,
} from "../middleware/validationMiddleware";
import {
  createTaskBodySchema,
  updateTaskBodySchema,
  taskIdSchema,
  getTaskQuerySchema,
} from "../schema/task";

const tasksRoutes = express.Router();

<<<<<<< Updated upstream
const taskRoutes = express.Router();

taskRoutes.get("/", authenticateJWT, taskController.getAllTasks);
taskRoutes.post(
  "/tasks",
  authenticateJWT,
  validateReqBody(createTaskBodySchema),
  taskController.createTask
);
taskRoutes.get(
  "/:id",
  authenticateJWT,
  validateReqParams(taskIdParamSchema),
  taskController.getTask
);
taskRoutes.put(
  "/:id",
  authenticateJWT,
  validateReqParams(taskIdParamSchema),
  validateReqBody(updateTaskBodySchema),
  taskController.updateTask
);
taskRoutes.delete(
  "/:id",
  authenticateJWT,
  validateReqParams(taskIdParamSchema),
  taskController.deleteTask
=======
tasksRoutes.get(
  "/",
  authenticate,
  authorize("tasks.get"),
  validateReqQuery(getTaskQuerySchema),
  getTasks
>>>>>>> Stashed changes
);

tasksRoutes.get(
  "/:id",
  authenticate,
  authorize("tasks.get"),
  validateReqParams(taskIdSchema),
  getTaskById
);

tasksRoutes.post(
  "/",
  authenticate,
  authorize("tasks.post"),
  validateReqBody(createTaskBodySchema),
  createTask
);

tasksRoutes.put(
  "/:id",
  authenticate,
  authorize("tasks.put"),
  validateReqParams(taskIdSchema),
  validateReqBody(updateTaskBodySchema),
  updateTask
);

tasksRoutes.delete(
  "/:id",
  authenticate,
  authorize("tasks.delete"),
  validateReqParams(taskIdSchema),
  deleteTask
);

export default tasksRoutes;
