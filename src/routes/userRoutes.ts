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

const router = express.Router();

router.get("/:id", validateReqParams(userIdParamSchema), getUser);
router.get("/", getAllUsers);

router.post("/register", validateReqBody(createUserBodySchema), createNewUser);
router.put(
  "/:id",
  validateReqParams(userIdParamSchema),
  validateReqBody(createUserBodySchema),
  updateUser
);
router.delete("/:id", validateReqParams(userIdParamSchema), deleteUser);

export default router;
