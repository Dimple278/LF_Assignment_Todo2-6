import { StatusCodes } from "http-status-codes";
import ApiError from "./apiError";

export default class BadRequestError extends ApiError {
  constructor(message: string = "Bad Request") {
    super(StatusCodes.BAD_REQUEST, message);
  }
}
