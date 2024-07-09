'use client';
import { Checklist, Code, PlayCircle } from '@mui/icons-material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { ELessonType, EUserLessonStatus } from '~/constant/enum/lessonEnum';
import routePath from '~/constant/routePath';
import { userContext } from '~/context/UserContext';
import { parseDurationVideo } from '~/helper/parseDurationVideo';

interface lessonComponentProps {
  id: string;
  name: string;
  quantity?: string;
  exerciseType: ELessonType;
  status: EUserLessonStatus;
}

// Determine the appropriate exercise icon based on exercise type
const renderIcon = (exerciseType: lessonComponentProps['exerciseType']) => {
  switch (exerciseType) {
    case ELessonType.Video:
      return <PlayCircle />;
    case ELessonType.Selection:
      return <Checklist />;
    case ELessonType.CodeScript:
      return <Code />;
    default:
      return <PlayCircle />;
  }
};

const LessonComponent: React.FC<lessonComponentProps> = ({ id: lessonId, name, quantity, exerciseType, status }) => {
  const { courseId } = useParams();

  const { isLogin } = useContext(userContext);

  return (
    <Link
      href={
        isLogin
          ? routePath.LESSON_DETAIL.replace('[courseId]', courseId as string).replace('[lessonId]', lessonId)
          : '#'
      }
      className="flex flex-row items-center place-items-center gap-3 p-3 hover:bg-slate-200 rounded-lg"
      onClick={() => !isLogin && toast('Vui lòng đăng nhập')}
    >
      {renderIcon(exerciseType)}
      <p className="px-2 flex-1">{name}</p>
      {status === EUserLessonStatus.Done ? <CheckCircleOutlineIcon color="success" className="ml-2" /> : <div></div>}
      {quantity && (
        <p className="min-w-[48px] text-center">
          {exerciseType === ELessonType.Video ? `${parseDurationVideo(parseInt(quantity))}` : `${quantity} câu`}
        </p>
      )}
    </Link>
  );
};
export default LessonComponent;
