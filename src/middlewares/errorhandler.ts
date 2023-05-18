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
//   else if (err.name === "ValidationError") {
//     statusCode = 400;
//     message = Object.values(err.errors).map((val: any) => val.message).join(', ');
//   } 
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
