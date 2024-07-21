import { NextFunction, Response, Request } from "express";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("RequestLogger");

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const { method, url, body, query, params } = req;
  logger.info(`${method}:${url}`, {
    details: { body, query, params },
  });
  next();
}
