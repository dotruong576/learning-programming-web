import { MutationOptions, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postLogout } from '~/api/auth';
import { QUERY_KEY } from '~/constant/reactQueryKey';
import { TError } from '~/types/genericTypes';
import { useRefetchGetMe } from '../user/useGetMe';

const useLogout = (config?: Partial<MutationOptions<string, TError, void, unknown>>) => {
  const { refetch } = useRefetchGetMe();

  return useMutation<string, TError, void, unknown>({
    ...config,
    mutationFn: postLogout,
    mutationKey: [QUERY_KEY.LOGOUT],
    onSuccess() {
      toast('Đã đăng xuất.');
      refetch();
    },
  });
};

export default useLogout;

