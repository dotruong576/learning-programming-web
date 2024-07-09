import jsonWebToken from 'jsonwebtoken';
import config from '../config';
import { TJWTPayload } from '../types/api/authTypes';

export type TReturnJWTType = {
  token: string;
  expires: string;
};

const signJWT = (payload: TJWTPayload): TReturnJWTType => {
  const signedToken = jsonWebToken.sign(payload, config.jwt.secret, {
    expiresIn: parseInt(config.jwt.expiredIn),
    algorithm: config.JWTAlgorithm,
  });

  return {
    token: signedToken,
    expires: config.jwt.expiredIn,
  };
};

export { signJWT };
