import { TCourseDocument, TLessonDocument, TUserDocument, TUserLessonDocument } from '../document.types';

export type TGetAllCourseStatisticResponse = Pick<
  TCourseDocument,
  'cover' | 'title' | 'lessonIds' | 'participantsId' | 'rating' | 'createdAt' | '_id'
>;

export type TGetAllMembersOfCourseStatisticResponse = Pick<TUserDocument, '_id' | 'fullName' | 'avatar'> & {
  participatedDate: TCourseDocument['participantsId'][0]['participatedDate'];
};

export type TGetAllLessonOfCourseStatisticResponse = Pick<
  TLessonDocument,
  'title' | 'duration' | 'createdAt' | 'type'
> & {
  completedTimes: number;
};

export type TGetMemberOfCourseStatisticResponse = Pick<TLessonDocument, 'title' | 'duration' | 'createdAt' | 'type'> & {
  status: TUserLessonDocument['status'] | null;
  result: {
    completed: number;
    total: number;
  } | null;
};

export type TGetDetailStatisticOfCourseRequest = {
  courseId: string;
};

export type TGetDetailStatisticMemberOfCourseRequest = {
  userId: string;
  courseId: string;
};
