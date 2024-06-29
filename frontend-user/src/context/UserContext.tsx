'use client';
import { createContext } from 'react';
import { TUserResponseBasicData } from '~/api/user';
import useGetMe from '~/hooks/user/useGetMe';

export type TUserContext = {
  isLogin: boolean;
  data: TUserResponseBasicData | undefined;
};

const defaultContextValue: TUserContext = {
  isLogin: false,
  data: undefined,
};

export const userContext = createContext<TUserContext>(defaultContextValue);

const UserContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const { data, error } = useGetMe({
    retry: 1,
  });

  return (
    <userContext.Provider
      value={{
        isLogin: !!data && !error,
        data,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
