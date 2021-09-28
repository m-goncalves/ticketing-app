import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationsError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    Object.setPrototypeOf(this, RequestValidationsError.prototype);
  }

  serializeErrors() {
    return this.errors.map(err => {
      return { message: err.msg, field: err.param }
    });
  }
}