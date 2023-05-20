import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import AppError from '../utils/AppError';


const errorHandler : ErrorRequestHandler = (err: AppError | Error, req: Request, res: Response, next : NextFunction) => {
  let message: string;
  let statusCode: number;

  console.log(err);
  console.log("error handler")
  console.log({ name: err.name, message: err.message });

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } 
  else {
    statusCode = 500;
    message = "Internal Server Error";
  }

   res.status(statusCode).json({
    success: false,
    statusCode,
    error: message
  });
};

export default errorHandler;
