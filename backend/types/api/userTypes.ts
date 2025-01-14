import { TUserSchema } from '../schema/userSchemaTypes';

export type TGetUserDetailById = {
  userId: string;
};

export type TGetUserDetailByEmail = {
  email: string;
};
export type TUserPayload = Pick<TUserSchema, 'email' | 'password' | 'fullName' | 'avatar'>;
export type TUpdateProfileUser = Partial<Omit<TUserPayload, 'email'>>;

export type TGetUserDetailDataResponse = Omit<TUserSchema, 'password'>;
