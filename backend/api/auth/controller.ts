import { Request, Response } from 'express';
import { catchError, tryCatchWrapper } from '../../common/catchError';
import { removeAuthCookieFromClient, sendAuthCookieToClient } from '../../common/cookies';
import { TLocalLoginPayload, TRegisterPayload } from '../../types/api/auth.types';
import { TServiceResponseBodyType } from '../../types/general.types';
import authServices from './service';

const authController = {
  loginWithEmailAndPassword: async (req: Request, res: Response<TServiceResponseBodyType>) => {
    try {
      const { data, statusCode, message } = await authServices.loginWithEmailAndPassword(
        req.body as TLocalLoginPayload,
      );
      sendAuthCookieToClient(res, data).status(statusCode).json({ data: null, message });
    } catch (error) {
      const errorObject = catchError(error);
      res.status(errorObject.statusCode).json({ data: errorObject.data, message: errorObject.message });
    }
  },
  register: tryCatchWrapper((req: Request) => authServices.register(req.body as TRegisterPayload)),
  logout: (_req: Request, res: Response) => {
    const { message, statusCode, data } = authServices.logout();
    removeAuthCookieFromClient(res).status(statusCode).json({ data, message });
  },
};

export default authController;
