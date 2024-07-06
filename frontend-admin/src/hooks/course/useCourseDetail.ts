'use client';
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getCourseById } from '~/api/courses';
import { QUERY_KEY } from '~/constant/reactQueryKey';
import { parseErrorMessage } from '~/helper/parseErrorMessage';
import { IGetCourseByIdResponse } from '~/types/api/courseTypes';
import { TError } from '~/types/genericTypes';

const useCourseDetail = (
  courseId: string,
  config?: Partial<UseQueryOptions<IGetCourseByIdResponse, TError, IGetCourseByIdResponse, QueryKey>>,
) => {
  const queryReturn = useQuery({
    queryKey: [QUERY_KEY.COURSE_DETAIL, courseId],
    queryFn: () => getCourseById(courseId),
    enabled: !!courseId,
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

export default useCourseDetail;

export function useRefetchCourseDetail(courseId: string) {
  const queryClient = useQueryClient();
  return {
    refetch() {
      queryClient.refetchQueries({ queryKey: [QUERY_KEY.COURSE_DETAIL, courseId], exact: true });
    },
  };
}
