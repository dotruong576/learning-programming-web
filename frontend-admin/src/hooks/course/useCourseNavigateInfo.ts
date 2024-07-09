import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { getCourseNavigate } from '~/api/courses';
import { QUERY_KEY } from '~/constant/reactQueryKey';
import { userContext } from '~/context/UserContext';
import { parseErrorMessage } from '~/helper/parseErrorMessage';
import { TGetCourseNavigateResponse } from '~/types/api/courseTypes';
import { TError } from '~/types/genericTypes';

const useCourseNavigateInfo = (
  courseId: string,
  lessonId: string,
  config?: Partial<UseQueryOptions<TGetCourseNavigateResponse, TError, TGetCourseNavigateResponse, QueryKey>>,
) => {
  const { isLogin } = useContext(userContext);

  const queryReturn = useQuery({
    queryFn: () => getCourseNavigate(courseId),
    queryKey: [QUERY_KEY.COURSE_NAVIGATE, courseId],
    enabled: !!courseId && isLogin,
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

  const prevAndPostId = useMemo(() => {
    if (queryReturn.data) {
      const _data = queryReturn.data;

      const currentIndex = _data.lessons.findIndex((item) => item._id === lessonId);

      const prevId = currentIndex - 1;
      const postId = currentIndex + 1;

      return {
        prevId: _data.lessons[prevId]?._id,
        postId: _data.lessons[postId]?._id,
        prevable: prevId >= 0,
        postable: postId < _data.lessons.length,
      };
    }
    return { prevId: null, postId: null, prevable: false, postable: false };
  }, [lessonId, queryReturn.data]);

  return { queryReturn, prevAndPostId };
};

export default useCourseNavigateInfo;
