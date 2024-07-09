import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { putUpdateComment } from '~/api/comment';
import { parseErrorMessage } from '~/helper/parseErrorMessage';
import { TCUCommentResponse, TUpdateCommentPayload } from '~/types/api/commentTypes';
import { TError } from '~/types/genericTypes';

const useUpdateComment = (
  config?: Partial<UseMutationOptions<TCUCommentResponse, TError, TUpdateCommentPayload, unknown>>,
) => {
  const mutationReturn = useMutation({
    mutationFn: putUpdateComment,
    onSuccess(_data, _key, _config) {
      toast('Sửa bình luận thành công.');
      config?.onSuccess && config?.onSuccess(_data, _key, _config);
    },
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

export default useUpdateComment;
