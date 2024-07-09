import { bcryptCompareSync, bcryptHashSync } from '../../common/bcrypt';
import { TReturnJWTType, signJWT } from '../../common/signJWT';
import AppError from '../../constant/error';
import { EHttpStatus } from '../../constant/statusCode';
import UserModel from '../../models/user';
import { TLocalLoginPayload, TRegisterPayload, TUserMiddlewareParse } from '../../types/api/auth.types';
import { TServiceResponseType } from '../../types/general.types';

const authServices = {
  register: async (reqBody: TRegisterPayload): Promise<TServiceResponseType<string | null>> => {
    reqBody.password = bcryptHashSync(reqBody.password);

    const existingUser = await UserModel.findOne({
      email: reqBody.email,
    });

    if (existingUser) {
      throw new AppError(EHttpStatus.BAD_REQUEST, 'Existing user');
    }

    await UserModel.create(reqBody);
    return {
      data: null,
      statusCode: EHttpStatus.OK,
      message: 'Register successfully',
    };
  },
  loginWithEmailAndPassword: async (
    reqBody: TLocalLoginPayload,
  ): Promise<TServiceResponseType<{ token: TReturnJWTType }>> => {
    const user = await UserModel.findOne({ email: reqBody.email }).select('+password');

    if (!user) {
      throw new AppError(EHttpStatus.BAD_REQUEST, 'Wrong email');
    }

    if (!bcryptCompareSync(reqBody.password, user.password)) {
      throw new AppError(EHttpStatus.BAD_REQUEST, 'Wrong password');
    }

    const userData: TUserMiddlewareParse = {
      id: user._id.toString(),
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    };

    const token = signJWT(userData);

    return {
      data: {
        token,
      },
      statusCode: EHttpStatus.OK,
      message: 'Login successfully',
    };
  },
  logout: (): TServiceResponseType => {
    return {
      data: null,
      statusCode: EHttpStatus.OK,
      message: 'Logout successfully',
    };
  },
};
export default authServices;
