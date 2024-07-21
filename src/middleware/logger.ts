import { NextFunction, Response } from "express";
import loggerNameSpace from "../utils/logger";
import { Request } from "../interface/auth";

const logger = loggerNameSpace("RequestLogger");

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  logger.info(`${req.method}: ${req.url}`);
  next();
}
