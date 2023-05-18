import { Request, Response, NextFunction, RequestHandler } from 'express';

const catchError = (controller: (req: Request, res: Response, next: NextFunction) => Promise<void>): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default catchError;

