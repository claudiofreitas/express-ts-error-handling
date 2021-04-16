import { HttpStatusCode } from '../enums/http-status-code';

export default class HttpSuccessResponse {
  public statusCode: HttpStatusCode;
  public body: unknown;

  constructor(statusCode: HttpStatusCode, body: unknown) {
    this.statusCode = statusCode;
    this.body = body;
  }
}
