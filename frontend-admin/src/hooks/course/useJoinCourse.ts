import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { postJoinedCourse } from '~/api/userCourse';
import { TError } from '~/types/genericTypes';

const useJoinCourse = (config?: Partial<UseMutationOptions<string, TError, string, unknown>>) => {
  const mutationReturn = useMutation({
    mutationFn: postJoinedCourse,
    ...config,
  });

  return mutationReturn;
};

export default useJoinCourse;
