import express from "express";
import { loginUser, refreshToken } from "../controller/authController";
import { validateReqBody } from "../middleware/validationMiddleware";

import {
  loginUserBodySchema,
  refreshTokenBodySchema,
} from "../schema/userSchema";

const authRouter = express.Router();

authRouter.post("/login", validateReqBody(loginUserBodySchema), loginUser);
authRouter.post(
  "/refresh-token",
  validateReqBody(refreshTokenBodySchema),
  refreshToken
);
