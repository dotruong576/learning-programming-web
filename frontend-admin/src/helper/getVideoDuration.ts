const getVideoDuration = (video: File) => {
  return new Promise<number>((res, _rej) => {
    const videoTag = document.createElement('video');
    const videoUrl = URL.createObjectURL(video);
    videoTag.src = videoUrl;
    videoTag.onloadedmetadata = () => {
      res(Math.floor(videoTag.duration));
      URL.revokeObjectURL(videoUrl);
    };
    videoTag.onerror = () => {
      res(0);
      URL.revokeObjectURL(videoUrl);
    };
  });
};

export default getVideoDuration;
