import { HttpStatusCode } from '../enums/http-status-code';

export default class HttpError extends Error {
  public statusCode: HttpStatusCode;
  public readonly body: unknown;

  constructor(statusCode: HttpStatusCode, body: unknown) {
    super();
    this.statusCode = statusCode;
    this.body = body;
  }
}
