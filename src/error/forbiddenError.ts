import ApiError from "./apiError";
import { StatusCodes } from "http-status-codes";

class ForbiddenError extends ApiError {
  constructor(message: string = "Forbidden") {
    super(StatusCodes.FORBIDDEN, message);
  }
}

export default ForbiddenError;
