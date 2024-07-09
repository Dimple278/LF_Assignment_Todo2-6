import express from "express";
import { validateUserBody } from "../middleware/validationMiddleware";
import {
  createNewUser,
  getAllUsers,
  getUser,
} from "../controller/userCOntroller";

const userRouter = express.Router();

userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getUser);
userRouter.post("/users", validateUserBody, createNewUser);

export default userRouter;
