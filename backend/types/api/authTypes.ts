import { UserSchema } from "../schema/userSchemaType";

export type TLoginRequest = Pick<UserSchema, 'email' | 'password'>;

export type TRegisterRequest = Pick<UserSchema, 'email' | 'fullName' | 'password'>;

export type JWTPayload = {
    id: string;
    fullName: string;
    email: string;
    role: string;
};

export type JWTVerify = {
    iat: number,
    exp: number
} & JWTPayload;

export type TUserRole = Pick <UserSchema, 'email' | 'fullName' | 'role'> & { id: string };
