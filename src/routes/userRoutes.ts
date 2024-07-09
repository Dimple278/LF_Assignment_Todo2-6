import express from "express";
import {
  getUser,
  loginUser,
  getAllUsers,
  createNewUser,
} from "../controller/userController";
import {
  validateUserBody,
  validateLoginBody,
} from "../middleware/validationMiddleware";
import authenticateJWT from "../middleware/authMIddleware";

const router = express.Router();

// router.get("/users", authenticateJWT, getAllUsers);
router.get("/users/:id", authenticateJWT, getUser);
router.post("/users", validateUserBody, createNewUser);
router.post("/users/login", validateLoginBody, loginUser);

export default router;
