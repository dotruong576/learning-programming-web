'use client';

import { Skeleton } from '@mui/material';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { ELessonType } from '~/constant/enum/lessonEnum';
import { useCount } from '~/hooks/useCount';
import useGetUserLessons from '~/hooks/userLessons/useGetUserLessons';
import { useSubmitVideoLessonResult } from '~/hooks/userLessons/useSubmitUserLessons';
import { TVideoLessonResourse } from '~/types/api/lessonTypes';
import { TUserVideoLessonCheckpoint } from '~/types/api/userLessonTypes';

const VideoQuestion = ({ resource }: { resource: TVideoLessonResourse }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const { courseId, lessonId } = useParams();

  const { data: previousResult, isSuccess } = useGetUserLessons(
    courseId as string,
    lessonId as string,
    ELessonType.Video,
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const lastRequestTimeToServer = useRef<number | null>(null);

  const { mutate } = useSubmitVideoLessonResult();

  const handleCheckTimeAndRequest = (e: MessageEvent) => {
    if (e.data?.name !== 'tick' || lastRequestTimeToServer.current === null) return;

    const currentPlayTime = Math.floor(videoRef.current?.currentTime || 0);

    // because we clean up set interval then create it again, delay time can cause mismatch +- 1s, like from 9.78s to 11.25s (floor is 9 to 11) so
    // must check >= 5, then just send time that divisible by 5 to server to sync with DB
    if (currentPlayTime - lastRequestTimeToServer.current >= 5) {
      lastRequestTimeToServer.current = currentPlayTime;
      mutate({ lastViewMoment: currentPlayTime.toString() });
    }
  };

  useCount({
    countable: isPlaying && !!videoRef.current,
    stop: !isPlaying,
    handleCountDown: handleCheckTimeAndRequest,
  });

  if (previousResult !== undefined && isSuccess) {
    return (
      <div className="bg-black ">
        <video
          ref={videoRef}
          onPause={() => {
            const currentTime = Math.floor(videoRef.current?.currentTime || 0);
            const duration = Math.floor(videoRef.current?.duration || 0);

            if (currentTime === duration) {
              mutate({ lastViewMoment: currentTime.toString() });
            }

            setIsPlaying(false);
          }}
          onPlay={() => {
            setIsPlaying(true);

            if (previousResult) {
              const offsetToResetPlayTime = 6; // in seconds
              const lastViewTime = parseInt((previousResult?.checkpoint as TUserVideoLessonCheckpoint).lastViewMoment);

              const momentToStart =
                lastViewTime >= Math.floor(videoRef.current?.duration || 0) - offsetToResetPlayTime ? 0 : lastViewTime;

              if (videoRef.current) {
                videoRef.current.currentTime = momentToStart;
              }

              lastRequestTimeToServer.current = momentToStart;
              return;
            }

            lastRequestTimeToServer.current = 0;
          }}
          controls
          src={resource.file}
          className="aspect-video mx-auto"
        />
      </div>
    );
  }

  return <Skeleton variant="rounded" width={'100%'} height={600} />;
};

export default VideoQuestion;
