import { NextFunction, Response, Request } from "express";
import loggerWithNameSpace from "../logger";

const logger = loggerWithNameSpace("RequestLogger");

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  logger.info(`${req.method}:${req.url}`);
  next();
}
