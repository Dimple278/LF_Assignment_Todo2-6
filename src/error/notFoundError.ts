import ApiError from "./apiError";
import { StatusCodes } from "http-status-codes";

class notFoundError extends ApiError {
  constructor(message: string = "Not found") {
    super(StatusCodes.NOT_FOUND, message);
  }
}

export default notFoundError;
