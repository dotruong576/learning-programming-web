import { MutationOptions, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postLogout } from '~/api/auth';
import { QUERY_KEY } from '~/constant/reactQueryKey';
import { TError } from '~/types/genericTypes';
import { useRefetchGetMe } from '../user/useGetMe';
import { useRouter } from 'next/navigation';

const useLogout = (config?: Partial<MutationOptions<string, TError, void, unknown>>) => {
  const router = useRouter();
  const { refetch } = useRefetchGetMe();

  return useMutation<string, TError, void, unknown>({
    ...config,
    mutationFn: postLogout,
    mutationKey: [QUERY_KEY.LOGOUT],
    onSuccess() {
      localStorage.removeItem('jwtToken');
      toast('Đã đăng xuất.');
      refetch();
      router.push('/login');
    },
  });
};

export default useLogout;
