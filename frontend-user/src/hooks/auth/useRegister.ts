import { MutationOptions, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { TAuthRegister, postRegister } from '~/api/auth';
import { QUERY_KEY } from '~/constant/reactQueryKey';
import { parseErrorMessage } from '~/helper/parseErrorMessage';
import { TError } from '~/types/genericTypes';

const useRegister = (config?: Partial<MutationOptions<string, TError, TAuthRegister, unknown>>) => {
  const router = useRouter();
  return useMutation<string, TError, TAuthRegister, unknown>({
    ...config,
    mutationKey: [QUERY_KEY.REGISTER],
    mutationFn: postRegister,
    onSuccess(data, key, config) {
      toast('Đăng kí thành công');
      router.push('/login');
    },
    onError(err, key, config) {
      const msg = parseErrorMessage(err, {
        mapFieldName: {
          fullName: 'Họ và tên',
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

export default useRegister;
