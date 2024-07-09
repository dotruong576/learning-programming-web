import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteComment } from '~/api/comment';
import { parseErrorMessage } from '~/helper/parseErrorMessage';
import { TCUCommentResponse } from '~/types/api/commentTypes';
import { TError } from '~/types/genericTypes';

const useDeleteComment = (
  config?: Partial<
    UseMutationOptions<TCUCommentResponse, TError, { commentId: string; courseId?: string; lessonId?: string }, unknown>
  >,
) => {
  const mutationReturn = useMutation({
    mutationFn: deleteComment,
    onSuccess(_data, _key, _config) {
      toast('Xoá bình luận thành công.');
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

export default useDeleteComment;
