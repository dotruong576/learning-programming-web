import { NextFunction, Request, Response } from 'express';
import { AnyObject, ObjectSchema, ValidationError } from 'yup';
import { EHttpStatus } from '../constant/statusCode';
import { TValidatorResponseBodyType } from '../types/general.types';

export const objectValidateOverride = <T extends AnyObject>(dto: ObjectSchema<T>, data: T) =>
  dto.validate(data, {
    abortEarly: false,
  });

const validateWrapper = <T>(
  validateCb: (req: Request<unknown, unknown, T>, res: Response, next: NextFunction) => Promise<T>,
) =>
  async function (
    req: Request,
    res: Response<TValidatorResponseBodyType<{ field: string; message: string }[]>>,
    next: NextFunction,
  ) {
    try {
      await validateCb(req, res, next);
      next();
    } catch (err) {
      const _err = err as ValidationError;
      res.status(EHttpStatus.BAD_REQUEST);
      res.json({
        message: 'Validation error',
        data: _err.inner.map((item) => ({ field: item.path || '', message: item.message })),
      });
      return;
    }
  };

export default validateWrapper;
