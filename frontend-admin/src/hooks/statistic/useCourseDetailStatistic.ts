import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getCourseDetailLessonsStatistic, getCourseDetailMembersStatistic } from '~/api/statistic';
import { QUERY_KEY } from '~/constant/reactQueryKey';
import { parseErrorMessage } from '~/helper/parseErrorMessage';
import {
  TGetAllLessonsOfCourseStatisticResponse,
  TGetAllMembersOfCourseStatisticResponse,
} from '~/types/api/statisticTypes';
import { TError } from '~/types/genericTypes';

export const useCourseDetailMembersStatistic = (
  courseId: string,
  config?: Partial<
    UseQueryOptions<
      TGetAllMembersOfCourseStatisticResponse[],
      TError,
      TGetAllMembersOfCourseStatisticResponse[],
      QueryKey
    >
  >,
) => {
  const queryReturn = useQuery({
    queryFn: () => getCourseDetailMembersStatistic(courseId),
    queryKey: [QUERY_KEY.STATISTIC_COURSE_MEMBER, courseId],
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

export const useCourseDetailLessonsStatistic = (
  courseId: string,
  config?: Partial<
    UseQueryOptions<
      TGetAllLessonsOfCourseStatisticResponse[],
      TError,
      TGetAllLessonsOfCourseStatisticResponse[],
      QueryKey
    >
  >,
) => {
  const queryReturn = useQuery({
    queryFn: () => getCourseDetailLessonsStatistic(courseId),
    queryKey: [QUERY_KEY.STATISTIC_COURSE_LESSON, courseId],
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
