import express from "express";
import {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controller/taskController";
import {
  validateTaskId,
  validatePostTaskBody,
  validatePutTaskBody,
} from "../middleware/validationMiddleware";
import { authenticateJWT } from "../middleware/authMIddleware";

const router = express.Router();

router.get("/tasks", authenticateJWT, getAllTasks);
router.get("/tasks/:id", authenticateJWT, validateTaskId, getTask);
router.post("/tasks", authenticateJWT, validatePostTaskBody, createTask);
router.put(
  "/tasks/:id",
  authenticateJWT,
  validateTaskId,
  validatePutTaskBody,
  updateTask
);
router.delete("/tasks/:id", authenticateJWT, validateTaskId, deleteTask);

export default router;
