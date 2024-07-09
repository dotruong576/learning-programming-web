import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { TUserResponseBasicData, getMe } from '~/api/user';
import { QUERY_KEY } from '~/constant/reactQueryKey';
import { TError } from '~/types/genericTypes';

const useGetMe = (
  userId: string,
  config?: Partial<UseQueryOptions<TUserResponseBasicData, TError, TUserResponseBasicData, QueryKey>>,
) => {
  return useQuery<TUserResponseBasicData, TError, TUserResponseBasicData, QueryKey>({
    ...config,
    queryKey: [QUERY_KEY.USER, userId],
    queryFn: getMe,
    enabled: !!userId && (config?.enabled || true),
  });
};

export default useGetMe;
