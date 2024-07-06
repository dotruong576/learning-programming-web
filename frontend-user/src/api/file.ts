import httpRequest from '~/services/httpRequest';

export const postUploadImage = (image: Blob) => {
  const formData = new FormData();

  formData.append('file', image);

  return httpRequest.post<string>('/file/image', formData);
};

export const postUploadVideo = (video: Blob) => {
  const formData = new FormData();

  formData.append('file', video);

  return httpRequest.post<string>('/file/video', formData);
};
