'use client';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LessonsListComponent from '~/components/lesson/lessons_list_component';
import routePath from '~/constant/routePath';
import useCourseNavigateInfo from '~/hooks/course/useCourseNavigateInfo';
import { LessonLayoutBackButton } from './lesson/lesson_layout_navigate';

const PaginationComponent = () => {
  const { courseId, lessonId } = useParams();
  const router = useRouter();

  const {
    prevAndPostId: { prevId, postId, prevable, postable },
    queryReturn: { data },
  } = useCourseNavigateInfo(courseId as string, lessonId as string);

  useEffect(() => {
    if (prevId) {
      router.prefetch(
        routePath.LESSON_DETAIL.replace('[courseId]', courseId as string).replace('[lessonId]', prevId.toString()),
      );
    }
    if (postId) {
      router.prefetch(
        routePath.LESSON_DETAIL.replace('[courseId]', courseId as string).replace('[lessonId]', postId.toString()),
      );
    }
  }, [courseId, postId, prevId, router]);

  return (
    <footer className="fixed flex justify-between bottom-0 left-0 right-0 bg-gray-200 py-4">
      <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
        <LessonLayoutBackButton />
      </div>
      <div className="flex justify-center space-x-4 flex-1">
        <Button
          startIcon={<ArrowBackIosNewIcon fontSize="small"></ArrowBackIosNewIcon>}
          variant="outlined"
          disabled={!prevable}
          onClick={() =>
            !prevId
              ? undefined
              : router.push(
                  routePath.LESSON_DETAIL.replace('[courseId]', courseId as string).replace(
                    '[lessonId]',
                    prevId.toString(),
                  ),
                )
          }
          className="flex items-center text-base font-medium"
        >
          Bài học trước
        </Button>
        <Button
          endIcon={<ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon>}
          variant="outlined"
          disabled={!postable}
          onClick={() =>
            !postId
              ? undefined
              : router.push(
                  routePath.LESSON_DETAIL.replace('[courseId]', courseId as string).replace(
                    '[lessonId]',
                    postId.toString(),
                  ),
                )
          }
          className="flex items-center text-base font-medium"
        >
          Bài học sau
        </Button>
      </div>
      <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
        <LessonsListComponent lessons={data?.lessons || []} />
      </div>
    </footer>
  );
};
export default PaginationComponent;
