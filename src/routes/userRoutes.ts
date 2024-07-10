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
import {
  authenticateJWT,
  authorizeSuperAdmin,
} from "../middleware/authMiddleware";

const router = express.Router();

router.get("/users", authenticateJWT, authorizeSuperAdmin, getAllUsers);
router.get("/users/:id", authenticateJWT, authorizeSuperAdmin, getUser);
router.post(
  "/users",
  validateUserBody,
  // authenticateJWT,
  // authorizeSuperAdmin,
  createNewUser
);
router.post("/users/login", validateLoginBody, loginUser);
router.post("/users/refresh", validateRefreshTokenBody, refreshToken);

export default router;
