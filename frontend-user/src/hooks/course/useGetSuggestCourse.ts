import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getSuggestedCourse } from '~/api/userCourse';
import { QUERY_KEY } from '~/constant/reactQueryKey';
import { parseErrorMessage } from '~/helper/parseErrorMessage';
import { TError } from '~/types/genericTypes';

export type TGetSuggestCourseResponse = {
  _id: string;
  title: string;
  cover: string;
  participantsId: { userId: string; participatedDate: string }[];
  createdAt: string;
};

const useGetSuggestCourse = (
  courseId: string,
  config?: Partial<UseQueryOptions<TGetSuggestCourseResponse[], TError, TGetSuggestCourseResponse[], QueryKey>>,
) => {
  const queryReturn = useQuery({
    queryFn: () => getSuggestedCourse(courseId),
    queryKey: [QUERY_KEY.SUGGEST_COURSE, courseId],
    ...config,
  });

  useEffect(() => {
    if (queryReturn.error && queryReturn.isError) {
      const msg = parseErrorMessage(queryReturn.error);
      if (Array.isArray(msg)) {
        msg.map((item) => toast(item, { type: 'error' }));
        return;
      }

      toast(msg, { type: 'error' });
    }
  }, [queryReturn.error, queryReturn.isError]);

  return queryReturn;
};

export default useGetSuggestCourse;
