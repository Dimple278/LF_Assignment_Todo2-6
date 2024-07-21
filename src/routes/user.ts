import express from "express";

import {
  getUser,
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
} from "../controller/userController";

import {
  validateReqParams,
  validateReqBody,
} from "../middleware/validationMiddleware";

import { createUserBodySchema, userIdParamSchema } from "../schema/userSchema";
import {
  authenticateJWT,
  authorizeSuperAdmin,
} from "../middleware/authMIddleware";

const userRoutes = express.Router();

userRoutes.get(
  "/:id",
  authenticateJWT,
  authorizeSuperAdmin,
  validateReqParams(userIdParamSchema),
  getUser
);
// userRoutes.get("/", getAllUsers);

userRoutes.post(
  "/",
  authenticateJWT,
  authorizeSuperAdmin,
  validateReqBody(createUserBodySchema),
  createNewUser
);

userRoutes.put(
  "/:id",
  authenticateJWT,
  authorizeSuperAdmin,
  validateReqParams(userIdParamSchema),
  validateReqBody(createUserBodySchema),
  updateUser
);
userRoutes.delete(
  "/:id",
  authenticateJWT,
  authorizeSuperAdmin,
  validateReqParams(userIdParamSchema),
  deleteUser
);

export default userRoutes;
