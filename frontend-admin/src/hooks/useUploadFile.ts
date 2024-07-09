import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postUploadImage, postUploadVideo } from '~/api/file';
import { TError } from '~/types/genericTypes';

export const useUploadImage = (config?: Partial<UseMutationOptions<string, TError, Blob, unknown>>) => {
  const mutationReturn = useMutation({
    mutationFn: postUploadImage,
    onError(_err, _key, _config) {
      return toast('Có lỗi khi tải file.', { type: 'error' });
    },
    ...config,
  });

  return mutationReturn;
};

export const useUploadVideo = (config?: Partial<UseMutationOptions<string, TError, Blob, unknown>>) => {
  const mutationReturn = useMutation({
    mutationFn: postUploadVideo,
    onError(_err, _key, _config) {
      return toast('Có lỗi khi tải file.', { type: 'error' });
    },
    ...config,
  });

  return mutationReturn;
};
