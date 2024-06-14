import { Request } from 'express';
import passportJWT from 'passport-jwt';
import { catchError } from '../common/catchError';
import config from '../config';
import { EAuthCookiesKey } from '../constant/enum/authEnum';
import AppError from '../constant/error';
import { EHttpStatus } from '../constant/statusCode';
import UserModel from '../models/user';
import { JWTVerify } from '../types/api/authTypes';

const generateJWTStrategy = () => {
  return new passportJWT.Strategy(
    {
      jwtFromRequest: (req: Request) => {
        return req.cookies[EAuthCookiesKey.Token];
      },
      secretOrKey: config.jwt.secret,
      algorithms: [config.JWTAlgorithm],
    },
    async function (jwtPayload: JWTVerify, done) {
      try {
        const user = await UserModel.findById(jwtPayload.id);
        if (user) {
          return done(null, jwtPayload);
        }
        return done(new AppError(EHttpStatus.UNAUTHORIZED, 'Invalid Credentials.'), false);
      } catch (error) {
        return done(catchError(error), false);
      }
    },
  );
};

export default generateJWTStrategy;
