import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export const internalErrorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error) {
    // Log here if there is anything to be logged.
    res.status(500).send('Internal error handler');
    return;
  }
};
