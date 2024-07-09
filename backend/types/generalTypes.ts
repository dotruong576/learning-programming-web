import { EHttpStatus } from '../constant/statusCode';

export type TServiceResponseType<T = null> = { statusCode: EHttpStatus; data: T; message?: string };
export type TServiceResponseBodyType<T = null> = { data: T; message?: string };
export type TValidatorResponseBodyType<T> = { message?: string; data?: T };
