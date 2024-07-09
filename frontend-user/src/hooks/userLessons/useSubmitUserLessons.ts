import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import {
  TUserCodescriptLessonResultSubmit,
  TUserSelectionLessonResultSubmit,
  TUserVideoLessonResultSubmit,
  postCodescriptLessonResult,
  postSelectionLessonResult,
  postVideoLessonResult,
} from '~/api/userLesson';
import { parseErrorMessage } from '~/helper/parseErrorMessage';
import { TError } from '~/types/genericTypes';

export const useSubmitSelectionLessonResult = (
  config?: Partial<UseMutationOptions<string, TError, TUserSelectionLessonResultSubmit, unknown>>,
) => {
  const params = useParams();

  const mutation = useMutation({
    mutationFn: (body: TUserSelectionLessonResultSubmit) =>
      postSelectionLessonResult({
        lessonId: params.lessonId as string,
        courseId: params.courseId as string,
        submit: body,
      }),
    onSuccess(_data, _key, _config) {
      toast('Nộp bài thành công.');
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

  return mutation;
};

export const useSubmitVideoLessonResult = (
  config?: Partial<UseMutationOptions<string, TError, TUserVideoLessonResultSubmit, unknown>>,
) => {
  const params = useParams();

  const mutation = useMutation({
    mutationFn: (body: TUserVideoLessonResultSubmit) =>
      postVideoLessonResult({
        lessonId: params.lessonId as string,
        courseId: params.courseId as string,
        submit: body,
      }),
    onSuccess(_data, _key, _config) {
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

  return mutation;
};

export const useSubmitCodescriptLessonResult = (
  config?: Partial<UseMutationOptions<string, TError, TUserCodescriptLessonResultSubmit, unknown>>,
) => {
  const params = useParams();

  const mutation = useMutation({
    mutationFn: (body: TUserCodescriptLessonResultSubmit) =>
      postCodescriptLessonResult({
        lessonId: params.lessonId as string,
        courseId: params.courseId as string,
        submit: body,
      }),
    onSuccess(_data, _key, _config) {
      toast('Nộp bài thành công.');
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

  return mutation;
};
