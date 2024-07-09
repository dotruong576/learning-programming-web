import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { postChangeCourseStatus } from '~/api/courses';
import { parseErrorMessage } from '~/helper/parseErrorMessage';
import { TError } from '~/types/genericTypes';

const useChangeCourseStatus = (config?: Partial<UseMutationOptions<string, TError, void, unknown>>) => {
  const { courseId } = useParams();

  const mutationReturn = useMutation({
    mutationFn: () => postChangeCourseStatus(courseId as string),
    onSuccess(_data, _key, _config) {
      toast('Trạng thái khoá học đã được cập nhật.');
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

export default useChangeCourseStatus;
