import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { updateLesson } from '~/api/lessons';
import { parseErrorMessage } from '~/helper/parseErrorMessage';
import { TCreateLessonPayload, TLessonResource } from '~/types/api/lessonTypes';
import { TError } from '~/types/genericTypes';

const useUpdateLesson = (
  lessonId: string,
  config?: Partial<
    UseMutationOptions<string, TError, Omit<TCreateLessonPayload<TLessonResource>, 'courseId'>, unknown>
  >,
) => {
  const { courseId } = useParams();

  const mutationReturn = useMutation({
    mutationFn: (data: Omit<TCreateLessonPayload<TLessonResource>, 'courseId'>) =>
      updateLesson(lessonId as string, { ...data, courseId: courseId as string }),
    onSuccess(_data, _key, _config) {
      toast('Bài học đã được cập nhật.');
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

  return mutationReturn;
};

export default useUpdateLesson;
