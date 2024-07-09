import express from "express";
import {
  getAllTasks,
  getTask,
  createNewTask,
  updateExistingTask,
  deleteExistingTask,
} from "../controller/taskController";
import {
  validateTaskId,
  validatePostTaskBody,
  validatePutTaskBody,
} from "../middleware/validationMiddleware";
import authenticateJWT from "../middleware/authMIddleware";

const router = express.Router();

router.get("/tasks", authenticateJWT, getAllTasks);
router.get("/tasks/:id", authenticateJWT, validateTaskId, getTask);
router.post("/tasks", authenticateJWT, validatePostTaskBody, createNewTask);
router.put(
  "/tasks/:id",
  authenticateJWT,
  validateTaskId,
  validatePutTaskBody,
  updateExistingTask
);
router.delete(
  "/tasks/:id",
  authenticateJWT,
  validateTaskId,
  deleteExistingTask
);

export default router;
