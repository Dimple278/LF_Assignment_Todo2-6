import express from "express";
import {
  getUser,
  getAllUsers,
  loginUser,
  createNewUser,
  updateUser,
  deleteUser,
  refreshToken,
} from "../controller/userController";
import {
  validateReqParams,
  validateReqBody,
} from "../middleware/validationMiddleware";
import {
  createUserBodySchema,
  loginUserBodySchema,
  refreshTokenBodySchema,
  userIdParamSchema,
} from "../schema/userSchema";

const router = express.Router();

router.get("/:id", validateReqParams(userIdParamSchema), getUser);
router.get("/", getAllUsers);
router.post("/login", validateReqBody(loginUserBodySchema), loginUser);
router.post("/register", validateReqBody(createUserBodySchema), createNewUser);
router.put(
  "/:id",
  validateReqParams(userIdParamSchema),
  validateReqBody(createUserBodySchema),
  updateUser
);
router.delete("/:id", validateReqParams(userIdParamSchema), deleteUser);
router.post(
  "/refresh-token",
  validateReqBody(refreshTokenBodySchema),
  refreshToken
);

export default router;
