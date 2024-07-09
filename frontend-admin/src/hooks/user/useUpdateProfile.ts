import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { putUpdateProfile } from '~/api/user';
import { parseErrorMessage } from '~/helper/parseErrorMessage';
import { TUserUpdatePayload } from '~/types/api/userTypes';
import { TError } from '~/types/genericTypes';

const useUpdateProfile = (config?: Partial<UseMutationOptions<string, TError, TUserUpdatePayload, unknown>>) => {
  const mutationReturn = useMutation({
    mutationFn: putUpdateProfile,
    onSuccess(_data, _key, _config) {},
    onError(_err, _key, _config) {
      const msg = parseErrorMessage(_err);
      if (Array.isArray(msg)) {
        return msg.map((item) => toast(item, { type: 'error' }));
      }

      return toast(msg, { type: 'error' });
    },
    ...config,
  });

  return mutationReturn;
};
export default useUpdateProfile;
