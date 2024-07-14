import express from "express";
import * as taskController from "../controller/taskController";
import {
  validateReqBody,
  validateReqParams,
} from "../middleware/validationMiddleware";
import {
  taskIdParamSchema,
  createTaskBodySchema,
  updateTaskBodySchema,
} from "../schema/taskSchema";

import { authenticateJWT } from "../middleware/authMIddleware";

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
);

export default taskRoutes;
