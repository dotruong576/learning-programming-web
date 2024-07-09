import { TCourseDocument, TLessonDocument, TUserLessonDocument } from '../document.types';

export type TCoursePayload = Pick<
  TCourseDocument,
  'title' | 'description' | 'cover' | 'lessonIds' | 'status' | 'label'
>;
export type TCourseById = {
  courseId: string;
};
export type TUpdateCourse = Partial<TCoursePayload>;

export type TGetCourseByIdResponse = Pick<
  TCourseDocument,
  'title' | 'cover' | 'description' | 'status' | 'rating' | 'label'
> & {
  isCurrentUserJoined: boolean;
  totalJoined: number;
  lessons: Array<Pick<TLessonDocument, 'title' | 'type' | 'duration' | '_id'> & Pick<TUserLessonDocument, 'status'>>;
};

export type TGetCourseNavigatePayload = {
  courseId: string;
};

export type TGetCourseNavigateResponse = {
  lessons: Array<Pick<TLessonDocument, 'title' | 'type'> & Pick<TUserLessonDocument, 'status'>>;
};
