import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { putUpdateCourse } from '~/api/courses';
import { parseErrorMessage } from '~/helper/parseErrorMessage';
import { TCoursePayload } from '~/types/api/courseTypes';
import { TError } from '~/types/genericTypes';

const useUpdateCourse = (
  courseId: string,
  config?: Partial<UseMutationOptions<string, TError, Partial<TCoursePayload>, unknown>>,
) => {
  const mutationReturn = useMutation({
    mutationFn: (data: Partial<TCoursePayload>) => putUpdateCourse(courseId, data),
    onSuccess(_data, _key, _config) {
      toast('Cập nhật khoá học thành công.');
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

export default useUpdateCourse;
