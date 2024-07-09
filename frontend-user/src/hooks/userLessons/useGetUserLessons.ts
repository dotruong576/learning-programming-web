import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getUserLessonResult } from '~/api/userLesson';
import { ELessonType } from '~/constant/enum/lessonEnum';
import { QUERY_KEY } from '~/constant/reactQueryKey';
import { userContext } from '~/context/UserContext';
import { parseErrorMessage } from '~/helper/parseErrorMessage';
import { TUserLessonResponse } from '~/types/api/userLessonTypes';
import { TError } from '~/types/genericTypes';

const useGetUserLessons = (
  courseId: string,
  lessonId: string,
  type?: ELessonType,
  config?: Partial<UseQueryOptions<TUserLessonResponse | null, TError, TUserLessonResponse | null, QueryKey>>,
) => {
  const { isLogin } = useContext(userContext);

  const queryReturn = useQuery({
    queryKey: [QUERY_KEY.USER_LESSON, type, lessonId, courseId],
    queryFn: () =>
      getUserLessonResult({
        lessonId: lessonId as string,
        courseId: courseId as string,
        type: type as ELessonType,
      }),
    enabled: !!type && !!courseId && !!lessonId && isLogin,
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

export default useGetUserLessons;

export function useRefetchGetUserLessons(courseId: string, lessonId: string, type?: ELessonType) {
  const queryClient = useQueryClient();

  return {
    refetch() {
      queryClient.refetchQueries({
        queryKey: [QUERY_KEY.USER_LESSON, type, lessonId, courseId],
        exact: true,
      });
    },
  };
}
