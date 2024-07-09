import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken';
import mongoose from 'mongoose';
import AppError from '../constant/error';
import { EHttpStatus } from '../constant/statusCode';
import { TServiceResponseBodyType, TServiceResponseType } from '../types/generalTypes';

const tryCatchWrapper =
  <T>(promise: (req: Request, res: Response, next: NextFunction) => Promise<TServiceResponseType<T>>) =>
  async (req: Request, res: Response<TServiceResponseBodyType<T | null>>, next: NextFunction) => {
    try {
      const result = await promise(req, res, next);
      res.status(result.statusCode).json({ data: result.data, message: result.message });
    } catch (error) {
      const errorObject = catchError(error);
      res.status(errorObject.statusCode).json({ data: errorObject.data, message: errorObject.message });
    }
  };

const catchError = (error: unknown) => {
  if (error instanceof AppError) {
    return {
      data: null,
      message: error.message,
      statusCode: error.statusCode,
    };
  }

  if (
    error instanceof mongoose.Error.ValidationError ||
    error instanceof mongoose.mongo.MongoServerError ||
    error instanceof mongoose.Error.CastError
  ) {
    return {
      data: null,
      statusCode: EHttpStatus.BAD_REQUEST,
      message: error.message,
    };
  }

  if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError || error instanceof NotBeforeError) {
    return {
      data: null,
      statusCode: EHttpStatus.UNAUTHORIZED,
      message: error.message,
    };
  }

  return {
    data: null,
    statusCode: EHttpStatus.INTERNAL_SERVER_ERROR,
    message: (error as { message: string; [key: string]: unknown })?.message ?? null,
  };
};

export { catchError, tryCatchWrapper };
