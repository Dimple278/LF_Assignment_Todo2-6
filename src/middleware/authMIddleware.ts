import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { getUserById } from "../model/userModel";
import UnauthorizedError from "../error/unauthorizedError";
import ForbiddenError from "../error/forbiddenError";

const { secretKey } = config;

if (!secretKey) {
  throw new Error("Secret key is not defined");
}

export interface AuthRequest extends Request {
  user?: JwtPayload & { id: number; email: string };
}

const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new UnauthorizedError("No token provided"));
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return next(new ForbiddenError("Invalid token"));
    }

    req.user = user as JwtPayload & { id: number; email: string };
    next();
  });
};

const authorizeSuperAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return next(new UnauthorizedError());
  }

  const user = getUserById(req.user.id);

  if (user.role !== "superadmin") {
    return next(new ForbiddenError());
  }

  next();
};

export { authenticateJWT, authorizeSuperAdmin };
