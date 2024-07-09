import express from "express";
import {
  validateLoginBody,
  validateUserBody,
} from "../middleware/validationMiddleware";
import {
  createNewUser,
  getAllUsers,
  getUser,
  loginUser,
} from "../controller/userCOntroller";

const userRouter = express.Router();

userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getUser);
userRouter.post("/users", validateUserBody, createNewUser);
userRouter.post("/users/login", validateLoginBody, loginUser);

export default userRouter;
