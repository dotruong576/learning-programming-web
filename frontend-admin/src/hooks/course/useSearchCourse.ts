import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getSearchCourse } from '~/api/userCourse';
import { QUERY_KEY } from '~/constant/reactQueryKey';
import { parseErrorMessage } from '~/helper/parseErrorMessage';
import { TSearchCourseResponse } from '~/types/api/courseTypes';
import { TError } from '~/types/genericTypes';

const useSearchCourse = (config?: Partial<UseMutationOptions<TSearchCourseResponse[], TError, string, unknown>>) => {
  const queryReturn = useMutation({
    mutationKey: [QUERY_KEY.SEARCH_COURSE],
    mutationFn: getSearchCourse,
    onSuccess(_data, _key, _config) {
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

  return queryReturn;
};

export default useSearchCourse;
