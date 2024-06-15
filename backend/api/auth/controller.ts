import { Request, Response } from 'express';
import { catchError, tryCatchWrapper } from '../../common/catchError';
import { removeAuthCookieFromClient, sendAuthCookieToClient } from '../../common/cookies';
import { TLoginRequest, TRegisterRequest } from '../../types/api/authTypes';
import { TServiceResponseBodyType } from '../../types/generalTypes';
import authServices from './services';

const authController = {
  loginWithEmailAndPassword: async (req: Request, res: Response<TServiceResponseBodyType>) => {
    try {
      const { data, statusCode, message } = await authServices.loginWithEmailAndPassword(
        req.body as TLoginRequest,
      );
      sendAuthCookieToClient(res, data).status(statusCode).json({ data: null, message });
    } catch (error) {
      const errorObject = catchError(error);
      res.status(errorObject.statusCode).json({ data: errorObject.data, message: errorObject.message });
    }
  },
  register: tryCatchWrapper((req: Request) => authServices.register(req.body as TRegisterRequest)),
  logout: (_req: Request, res: Response) => {
    const { message, statusCode, data } = authServices.logout();
    removeAuthCookieFromClient(res).status(statusCode).json({ data, message });
  },
};

export default authController;
