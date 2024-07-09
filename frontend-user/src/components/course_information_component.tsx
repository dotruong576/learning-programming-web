'use client';

import { Button, Rating, Skeleton } from '@mui/material';
import Image from 'next/image';
import { useContext } from 'react';
import { userContext } from '~/context/UserContext';
import useCourseDetail from '~/hooks/course/useCourseDetail';
import useJoinCourse from '~/hooks/course/useJoinCourse';
import LessonComponent from './lesson/lesson_component';

const CourseInformationComponent = ({ courseId }: { courseId: string }) => {
  const { data, isSuccess, refetch } = useCourseDetail(courseId, {});
  const { isLogin } = useContext(userContext);

  const { mutate } = useJoinCourse({
    onSuccess() {
      refetch();
    },
  });

  if (isSuccess && data) {
    return (
      <div className="flex flex-row m-8">
          <div className="basis-1/4 p-4 flex flex-col items-center gap-[30px]">
          <Image
            src={data?.cover || '/images/default_cover.png'}
            alt="course cover"
            className="rounded-xl aspect-[1.67]"
            width={400}
            height={240}
          />
          <div>
            <div className="mx-auto flex flex-col gap-3 items-center">
              {!data.isCurrentUserJoined && (
                <Button disabled={!isLogin} onClick={() => mutate(courseId)} className="!w-fit" variant="contained">
                  Join Course
                </Button>
              )}
              <div className="flex flex-col gap-y-3 my-3 ">
                <p>
                  <b>Total Lesson:</b> {data?.lessons.length}
                </p>
                <p>
                  <b>Total learner:</b> {data?.totalJoined}
                </p>
                <div className="flex font-semibold align-middle">
                <Rating className="mx-auto mr-2" name="comment-rating" value={data.rating} precision={0.5} readOnly /> {data.rating}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="basis-3/4 p-4">
          <h1 className="text-4xl font-bold h-12">{data?.title}</h1>

          <label htmlFor="des-courses">{data?.description}</label>

          <h2 className="text-2xl font-bold mt-10 mb-4">Curriculum</h2>
          <div className="grid grid-rows-[repeat(auto-fit,minmax(auto,1fr))] gap-y-3 max-h-[420px] overflow-y-auto">
            {data?.lessons.map((item, index) => (
              <div key={index}>
                <LessonComponent
                  id={item._id}
                  name={item.title}
                  quantity={item.duration.toString()}
                  exerciseType={item.type}
                  status={item.status}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <CourseInformationComponentSkeleton />;
};

export default CourseInformationComponent;

export function CourseInformationComponentSkeleton() {
  return (
    <div className="flex flex-row m-8">
      <div className="basis-3/4 p-4">
        <Skeleton variant="rounded" width={'100%'} height={'24px'} />
        <Skeleton variant="rounded" width={'100%'} height={'24px'} />

        <h2 className="text-2xl font-bold mt-10 mb-4">Nội dung khoá học</h2>
        <Skeleton variant="rounded" width={'100%'} height={'300px'} />
      </div>

      <div className="basis-1/4 p-4 flex flex-col items-center gap-[30px]">
        <Skeleton variant="rounded" width={'100%'} height={'200px'} />
        <Skeleton variant="rounded" width={'100%'} height={'70px'} />
      </div>
    </div>
  );
}
