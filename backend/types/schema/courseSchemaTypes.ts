import { ECourseStatus } from '../../constant/enum/courseEnum';

export type CourseSchema = {
  title: string;
  description: string;
  cover?: string;
  rating: number;
  lessonIds: string[];
  status: ECourseStatus;
  label: string[];
  participantsId: { userId: string; participatedDate: Date }[];
  comments: string[];
};
