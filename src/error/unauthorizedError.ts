import ApiError from "./apiError";
import { StatusCodes } from "http-status-codes";

class UnauthorizedError extends ApiError {
  constructor(message: string = "Unauthorized") {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}

export default UnauthorizedError;
