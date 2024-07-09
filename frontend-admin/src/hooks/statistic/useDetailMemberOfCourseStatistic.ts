import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getMemberDetailOfCourseStatistic } from '~/api/statistic';
import { QUERY_KEY } from '~/constant/reactQueryKey';
import { parseErrorMessage } from '~/helper/parseErrorMessage';
import { TGetMemberOfCourseStatisticResponse } from '~/types/api/statisticTypes';
import { TError } from '~/types/genericTypes';

export const useDetailMemberOfCourseStatistic = (
  courseId: string,
  userId: string,
  config?: Partial<
    UseQueryOptions<TGetMemberOfCourseStatisticResponse[], TError, TGetMemberOfCourseStatisticResponse[], QueryKey>
  >,
) => {
  const queryReturn = useQuery({
    queryFn: () => getMemberDetailOfCourseStatistic(courseId, userId),
    queryKey: [QUERY_KEY.STATISTIC_COURSE_MEMBER_DETAIL, courseId, userId],
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
