import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { TUserResponseBasicData, getMe } from '~/api/user';
import { QUERY_KEY } from '~/constant/reactQueryKey';
import { parseErrorMessage } from '~/helper/parseErrorMessage';
import { TError } from '~/types/genericTypes';

const useGetMe = (
  config?: Partial<UseQueryOptions<TUserResponseBasicData, TError, TUserResponseBasicData, QueryKey>>,
) => {
  const queryReturn = useQuery<TUserResponseBasicData, TError, TUserResponseBasicData, QueryKey>({
    ...config,
    queryKey: [QUERY_KEY.ME],
    queryFn: getMe,
  });

  useEffect(() => {
    if (queryReturn.error) {
      const _err = queryReturn.error;
      const msg = parseErrorMessage(_err);
      if (Array.isArray(msg)) {
        msg.map((item) => toast(item, { type: 'error' }));
        return;
      }
      toast(msg, { type: 'error' });
    }
  }, [queryReturn.error]);

  return queryReturn;
};

export const useRefetchGetMe = () => {
  const queryClient = useQueryClient();
  return {
    refetch() {
      queryClient.refetchQueries({ queryKey: [QUERY_KEY.ME], exact: true, stale: true });
    },
  };
};

export default useGetMe;
