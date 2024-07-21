import ApiError from "./apiError";
import { StatusCodes } from "http-status-codes";

class internalServerError extends ApiError {
  constructor(message: string = "INternal Server Error") {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message);
  }
}

export default internalServerError;
