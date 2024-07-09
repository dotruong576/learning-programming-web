import { CookieOptions, Response } from 'express';
import { EAuthCookiesKey } from '../constant/enum/auth.enum';
import { TReturnJWTType } from './signJWT';

export const sendToClientCookieOptions = (expires: string): CookieOptions => ({
  maxAge: parseInt(expires) * 1000, //convert from seconds to milliseconds
  httpOnly: true,
  sameSite: 'none',
  secure: true,
});

export const sendAuthCookieToClient = (res: Response, authCredentials: { token: TReturnJWTType }) => {
  const { token } = authCredentials;
  res.cookie(EAuthCookiesKey.Token, token.token, sendToClientCookieOptions(token.expires));
  return res;
};

export const removeAuthCookieFromClient = (res: Response) => {
  res.clearCookie(EAuthCookiesKey.Token);
  return res;
};
