'use client';
import { Skeleton } from '@mui/material';
import Courses_Thumbnail from '~/components/courses';
import useGetSuggestCourse from '~/hooks/course/useGetSuggestCourse';

const SuggestCourse = ({ courseId }: { courseId: string }) => {
  const { data } = useGetSuggestCourse(courseId);
  if (data) {
    return (
      <div className="p-[20px_10px] lg:p-10">
      <h3 className="text-2xl font-bold mt-8">Related Courses</h3>
      <div className="flex flex-wrap my-4">
        {data.map((item) => (
          <Courses_Thumbnail
            key={item._id}
            id={item._id}
            name={item.title}
            image={item.cover}
            views={item.participantsId.length}
            rating={item.rating}
          />
        ))}
      </div>
      </div>
    );
  }

  return (
    <div className="m-8 p-4">
      <h2 className="text-2xl font-bold">Related Courses</h2>
      <div className="flex overflow-auto gap-10 mt-8 py-2">
        {new Array(10).fill(0).map((_, index) => (
          <Skeleton key={index} variant="rounded" height={250} width={300} className="flex-shrink-0" />
        ))}
      </div>
    </div>
  );
};

export default SuggestCourse;
