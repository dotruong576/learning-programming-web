import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { TAuthLogin, postLogin } from '~/api/auth';
import { QUERY_KEY } from '~/constant/reactQueryKey';
import { parseErrorMessage } from '~/helper/parseErrorMessage';
import { TError } from '~/types/genericTypes';
import { useRefetchGetMe } from '../user/useGetMe';

const useLogin = (config?: Partial<UseMutationOptions<string, TError, TAuthLogin, unknown>>) => {
  const router = useRouter();
  const { refetch } = useRefetchGetMe();

  return useMutation<string, TError, TAuthLogin, unknown>({
    ...config,
    mutationKey: [QUERY_KEY.LOGIN],
    mutationFn: postLogin,
    onSuccess(_data, _key, _config) {
      toast('Đăng nhập thành công');
      refetch();
      router.push('/');
    },
    onError(_err, _key, _config) {
      const msg = parseErrorMessage(_err, {
        mapFieldName: {
          password: 'Mật khẩu',
          email: 'Email',
        },
      });
      if (Array.isArray(msg)) {
        return msg.map((item) => toast(item, { type: 'error' }));
      }

      return toast(msg, { type: 'error' });
    },
  });
};

export default useLogin;
