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

const router = express.Router();

router.get("/tasks", authenticateJWT, taskController.getAllTasks);
router.post(
  "/tasks",
  authenticateJWT,
  validateReqBody(createTaskBodySchema),
  taskController.createTask
);
router.get(
  "/tasks/:id",
  authenticateJWT,
  validateReqParams(taskIdParamSchema),
  taskController.getTask
);
router.put(
  "/tasks/:id",
  authenticateJWT,
  validateReqParams(taskIdParamSchema),
  validateReqBody(updateTaskBodySchema),
  taskController.updateTask
);
router.delete(
  "/tasks/:id",
  authenticateJWT,
  validateReqParams(taskIdParamSchema),
  taskController.deleteTask
);

export default router;
