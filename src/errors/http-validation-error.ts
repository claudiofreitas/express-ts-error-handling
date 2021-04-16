import HttpError from './http-error';
import { ValidationError } from '../types/validation-error';
import { HttpStatusCode } from '../enums/http-status-code';

export default class HttpValidationError extends HttpError {
  constructor(errors: ValidationError[]) {
    const body = {
      message: 'Validation error',
      errors,
    };
    super(HttpStatusCode.BAD_REQUEST, body);
  }
}
