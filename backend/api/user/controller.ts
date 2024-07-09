import { Request } from 'express';
import { tryCatchWrapper } from '../../common/catchError';
import { TUserMiddlewareParse } from '../../types/api/auth.types';
import { TGetUserDetailByEmail, TGetUserDetailById } from '../../types/api/user.types';
import userService from './service';

const userController = {
  getUserById: tryCatchWrapper((req: Request) => userService.getUserById(req.params as TGetUserDetailById)),
  getUserByEmail: tryCatchWrapper((req: Request) => {
    return userService.getUserByEmail(req.body as TGetUserDetailByEmail);
  }),
  getMe: tryCatchWrapper(async (req: Request) => await userService.getMe(req.user as TUserMiddlewareParse)),
  updateProfileUser: tryCatchWrapper((req: Request) => userService.updateProfileUser(req)),
};

export default userController;
