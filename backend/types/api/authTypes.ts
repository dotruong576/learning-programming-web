import { TUserSchema } from '../schema/userSchemaTypes';

export type TLocalLoginPayload = Pick<TUserSchema, 'email' | 'password'>;

export type TRegisterPayload = Pick<TUserSchema, 'email' | 'fullName' | 'password'>;

export type TJWTPayload = {
  id: string;
  fullName: string;
  email: string;
  role: string;
};

export type TJWTVerify = {
  // seconds create
  iat: number;
  // seconds expired
  exp: number;
} & TJWTPayload;

export type TUserMiddlewareParse = Pick<TUserSchema, 'email' | 'fullName' | 'role'> & { id: string };
