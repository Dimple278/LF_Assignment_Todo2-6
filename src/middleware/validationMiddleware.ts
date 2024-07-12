import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import ApiError from "../error/apiError";

export function validateReqParams(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.params);
    if (error) {
      return next(new ApiError(400, error.message));
    }
    req.params = value;
    next();
  };
}

export function validateReqBody(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return next(new ApiError(400, error.message));
    }
    req.body = value;
    next();
  };
}
