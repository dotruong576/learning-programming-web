import { ELessonType, EUserLessonStatus } from '~/constant/enum/lessonEnum';

export type TGetAllCourseStatisticResponse = {
  title: string;
  cover: string;
  rating: number;
  lessonIds: string[];
  participantsId: { userId: string; participatedDate: string }[];
  createdAt: string;
  _id: string;
};

export type TGetAllMembersOfCourseStatisticResponse = {
  participatedDate: string;
  _id: string;
  fullName: string;
  avatar: string;
};

export type TGetAllLessonsOfCourseStatisticResponse = {
  title: string;
  duration: string;
  createdAt: string;
  type: ELessonType;
  completedTimes: number;
  _id: string;
};

export type TGetMemberOfCourseStatisticResponse = {
  status: EUserLessonStatus;
  result: {
    completed: number;
    total: number;
  } | null;
  title: string;
  duration: string;
  createdAt: string;
  type: ELessonType;
  _id: string;
};
