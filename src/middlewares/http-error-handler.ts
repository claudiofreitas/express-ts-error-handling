import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import HttpError from '../errors/http-error';

export const httpErrorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof HttpError) {
    res.status(error.statusCode).send(error.body);
    return;
  } else {
    next(error);
  }
};
