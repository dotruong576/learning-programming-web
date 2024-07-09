import { ECourseStatus } from '../../constant/enum/course.enum';

export type TCourseSchema = {
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
