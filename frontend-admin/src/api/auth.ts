import httpRequest from '~/services/httpRequest';

export type TAuthLogin = {
  email: string;
  password: string;
};
export const postLogin = (body: TAuthLogin) => httpRequest.post<string>('/auth/login', body);

export const postLogout = () => httpRequest.post<string>(`/auth/logout`, null);
