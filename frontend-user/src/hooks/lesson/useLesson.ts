import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getLessonById } from '~/api/lessons';
import { QUERY_KEY } from '~/constant/reactQueryKey';
import { parseErrorMessage } from '~/helper/parseErrorMessage';
import { TGetLessonByIdResponse } from '~/types/api/lessonTypes';
import { TError } from '~/types/genericTypes';

const useLesson = (
  lessonId: string,
  config?: Partial<UseQueryOptions<TGetLessonByIdResponse, TError, TGetLessonByIdResponse, QueryKey>>,
) => {
  const queryReturn = useQuery({
    queryKey: [QUERY_KEY.LESSON, lessonId],
    queryFn: () => getLessonById(lessonId),
    ...config,
  });

  useEffect(() => {
    if (queryReturn.error) {
      const _err = queryReturn.error;
      const msg = parseErrorMessage(_err);
      if (Array.isArray(msg)) {
        msg.map((item) => toast(item, { type: 'error' }));
        return;
      }
      toast(msg, { type: 'error' });
    }
  }, [queryReturn.error]);

  return queryReturn;
};

export default useLesson;
