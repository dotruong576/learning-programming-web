import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postCreateCourse } from '~/api/courses';
import { parseErrorMessage } from '~/helper/parseErrorMessage';
import { TCoursePayload } from '~/types/api/courseTypes';
import { TError } from '~/types/genericTypes';

const useCreateCourse = (config?: Partial<UseMutationOptions<string, TError, TCoursePayload, unknown>>) => {
  const mutationReturn = useMutation({
    mutationFn: postCreateCourse,
    onSuccess(_data, _key, _config) {
      toast('Tạo khoá học thành công.');
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

export default useCreateCourse;
