import httpRequest from '~/services/httpRequest';

export type TAuthLogin = {
  email: string;
  password: string;
};
export const postLogin = (body: TAuthLogin) => httpRequest.post<string>('/auth/login', body);

export type TAuthRegister = {
  email: string;
  password: string;
  fullName: string;
};
export const postRegister = (body: TAuthRegister) => httpRequest.post<string>('/auth/register', body);

export const postLogout = () => httpRequest.post<string>(`/auth/logout`, null);
