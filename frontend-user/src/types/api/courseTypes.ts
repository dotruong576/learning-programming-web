import { ECourseStatus } from '~/constant/enum/courseEnum';
import { ELessonType, EUserLessonStatus } from '~/constant/enum/lessonEnum';

export interface IAllCouresResponse {
  title: string;
  description: string;
  cover: string;
  totalJoined: number;
  createdAt: string;
  _id: string;
}

export type IGetCourseByIdResponse = {
  title: string;
  description: string;
  cover: string;
  isCurrentUserJoined: boolean;
  totalJoined: number;
  status: ECourseStatus;
  rating: number;
  label: string[];

  lessons: Array<{
    _id: string;
    title: string;
    type: ELessonType;
    duration: number;
    status: EUserLessonStatus;
  }>;
};

export type TGetCourseNavigateResponse = {
  lessons: { title: string; type: ELessonType; _id: string; status: EUserLessonStatus }[];
};

export type TCoursePayload = {
  title: string;
  description: string;
  cover: string;
  lessonIds: string[];
  label: string[];
};

export type TSearchCourseResponse = {
  _id: string;
  title: string;
  cover: string;
};
