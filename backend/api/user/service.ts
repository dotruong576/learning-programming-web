import { Request } from 'express';
import { bcryptHashSync } from '../../common/bcrypt';
import AppError from '../../constant/error';
import { PASSWORD_REGEX } from '../../constant/regex';
import { EHttpStatus } from '../../constant/statusCode';
import UserModel from '../../models/user';
import { TUserMiddlewareParse } from '../../types/api/auth.types';
import {
  TGetUserDetailByEmail,
  TGetUserDetailById,
  TGetUserDetailDataResponse,
  TUpdateProfileUser,
} from '../../types/api/user.types';
import { TServiceResponseType } from '../../types/general.types';
import { TUserSchema } from '../../types/schema/user.schema.types';

const userService = {
  createUser: async (req: TUserSchema): Promise<TServiceResponseType<TGetUserDetailDataResponse | null>> => {
    const user = await UserModel.create(req);
    return {
      data: user,
      statusCode: EHttpStatus.OK,
      message: 'Create user successfully',
    };
  },
  getUserById: async (params: TGetUserDetailById): Promise<TServiceResponseType<TGetUserDetailDataResponse | null>> => {
    const user = await UserModel.findById({ _id: params.userId });

    if (!user) {
      throw new AppError(EHttpStatus.NOT_FOUND, 'User not found');
    }

    return {
      data: user,
      statusCode: EHttpStatus.OK,
      message: 'Get user successfully',
    };
  },
  getUserByEmail: async (
    req: TGetUserDetailByEmail,
  ): Promise<TServiceResponseType<TGetUserDetailDataResponse | null>> => {
    const user = await UserModel.findOne({ email: req.email }); //email is unique

    if (!user) {
      throw new AppError(EHttpStatus.NOT_FOUND, 'User not found');
    }

    return {
      data: user,
      statusCode: EHttpStatus.OK,
      message: 'Get user successfully',
    };
  },
  getMe: async (user: TUserMiddlewareParse): Promise<TServiceResponseType<TGetUserDetailDataResponse | null>> => {
    const foundUser = await UserModel.findOne({ email: user.email }); //email is unique

    if (!foundUser) {
      throw new AppError(EHttpStatus.NOT_FOUND, 'User not found');
    }

    return {
      data: foundUser,
      statusCode: EHttpStatus.OK,
    };
  },
  updateProfileUser: async (req: Request) => {
    const reqBody = req.body as TUpdateProfileUser;
    const reqUser = req.user as TUserMiddlewareParse;

    if (reqBody.password) {
      if (!PASSWORD_REGEX.test(reqBody.password)) {
        throw new AppError(EHttpStatus.BAD_REQUEST, 'Password format is invalid.');
      }

      reqBody.password = bcryptHashSync(reqBody.password);
    }
    const user = await UserModel.findById(reqUser.id);

    if (!user) {
      throw new AppError(EHttpStatus.NOT_FOUND, 'user not found');
    }

    user.avatar = reqBody.avatar || user.avatar;
    (user.fullName = reqBody.fullName || user.fullName), (user.password = reqBody.password || user.password);

    await user.save();

    return {
      data: user,
      statusCode: EHttpStatus.OK,
      message: 'Update user successfully',
    };
  },
};

export default userService;
