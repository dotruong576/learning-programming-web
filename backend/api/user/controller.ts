import { Request } from 'express';
import { tryCatchWrapper } from '../../common/catchError';
import { TUserMiddlewareParse } from '../../types/api/authTypes';
import { TGetUserDetailByEmail, TGetUserDetailById } from '../../types/api/userTypes';
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
