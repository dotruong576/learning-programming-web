import { Request } from 'express';
import { tryCatchWrapper } from '../../common/catchError';
import { TUserRole } from '../../types/api/authTypes';
import { TGetUserDetailByEmail, TGetUserDetailById } from '../../types/api/userTypes';
import userService from './services';

const userController = {
  getUserById: tryCatchWrapper((req: Request) => userService.getUserById(req.params as TGetUserDetailById)),
  getUserByEmail: tryCatchWrapper((req: Request) => {
    return userService.getUserByEmail(req.body as TGetUserDetailByEmail);
  }),
  getMe: tryCatchWrapper(async (req: Request) => await userService.getMe(req.user as TUserRole)),
  updateProfileUser: tryCatchWrapper((req: Request) => userService.updateProfileUser(req)),
};

export default userController;
