import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import generateJWTStrategy from '../common/jwtStrategy';
import { EHttpStatus } from '../constant/statusCode';
import { TUserRole } from '../types/api/authTypes';

const authenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {
  passport.use(generateJWTStrategy());
  passport.authenticate('jwt', { session: false }, (err: Error, user: TUserRole) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(EHttpStatus.UNAUTHORIZED).json({ message: 'Invalid Credentials' });
      return;
    }
    req.user = user;
    return next();
  })(req, res, next);
};

export default authenticateMiddleware;

export const nonStrictAuthenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {
  passport.use(generateJWTStrategy());
  passport.authenticate('jwt', { session: false }, (err: Error, user: TUserRole) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next();
    }
    req.user = user;
    return next();
  })(req, res, next);
};
