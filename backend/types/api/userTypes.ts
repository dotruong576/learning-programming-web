import { UserSchema } from '../schema/userSchemaTypes';

export type TGetUserDetailById = {
  userId: string;
};

export type TGetUserDetailByEmail = {
  email: string;
};
export type TUserPayload = Pick<UserSchema, 'email' | 'password' | 'fullName' | 'avatar'>;
export type TUpdateProfileUser = Partial<Omit<TUserPayload, 'email'>>;

export type TGetUserDetailDataResponse = Omit<UserSchema, 'password'>;
