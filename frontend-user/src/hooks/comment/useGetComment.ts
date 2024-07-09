import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getCourseComment, getLessonComment, getRepliesOfComment } from '~/api/comment';
import { QUERY_KEY } from '~/constant/reactQueryKey';
import { parseErrorMessage } from '~/helper/parseErrorMessage';
import { TCUCommentResponse } from '~/types/api/commentTypes';
import { TError } from '~/types/genericTypes';

export const useGetCommentByCourseId = (
  courseId: string,
  config?: Partial<UseQueryOptions<TCUCommentResponse[], TError, TCUCommentResponse[], QueryKey>>,
) => {
  const queryReturn = useQuery({
    queryKey: [QUERY_KEY.COMMENT_COURSE, courseId],
    queryFn: () => getCourseComment(courseId),
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

export const useGetCommentByLessonId = (
  lessonId: string,
  config?: Partial<UseQueryOptions<TCUCommentResponse[], TError, TCUCommentResponse[], QueryKey>>,
) => {
  const queryReturn = useQuery({
    queryKey: [QUERY_KEY.COMMENT_LESSON, lessonId],
    queryFn: () => getLessonComment(lessonId),
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

export const useGetRepliesByCommentId = (
  commentId: string,
  config?: Partial<UseQueryOptions<TCUCommentResponse[], TError, TCUCommentResponse[], QueryKey>>,
) => {
  const queryReturn = useQuery({
    queryKey: [QUERY_KEY.COMMENT_REPLIES, commentId],
    queryFn: () => getRepliesOfComment(commentId),
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
