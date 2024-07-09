import express from "express";
import {
  getUser,
  loginUser,
  getAllUsers,
  createNewUser,
  refreshToken,
} from "../controller/userController";
import {
  validateUserBody,
  validateLoginBody,
  validateRefreshTokenBody,
} from "../middleware/validationMiddleware";
import authenticateJWT from "../middleware/authMIddleware";

const router = express.Router();

// router.get("/users", getAllUsers);
router.get("/users/:id", authenticateJWT, getUser);
router.post("/users", validateUserBody, createNewUser);
router.post("/users/login", validateLoginBody, loginUser);
router.post("/users/refresh", validateRefreshTokenBody, refreshToken);

export default router;
