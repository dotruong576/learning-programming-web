'use client';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useRouter } from 'next/navigation';
import routePath from '~/constant/routePath';
import { generatePathname } from '~/helper/generatePathname';

export const LessonLayoutBackButton = () => {
  const router = useRouter();
  const { courseId } = useParams();

  return (
    <div
      className="flex items-center gap-4 mt-5 mb-3 cursor-pointer w-fit"
      onClick={() =>
        router.push(
          generatePathname({
            pathName: routePath.COURSE_DETAIL,
            query: {
              courseId: courseId as string,
            },
          }),
        )
      }
    >
      <ArrowBackIcon />
      Return course
    </div>
  );
};
