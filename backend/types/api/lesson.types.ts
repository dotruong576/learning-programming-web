import { TLessonResource } from '../schema/lesson.schema.types';

export type TLessonById = {
  lessonId: string;
};

export type TCreateLessonPayload<T extends TLessonResource> = {
  courseId: string;
  title: string;
  description: string;
  /**total seconds if type === Video, else number (number of questions) */
  resource: T;
};
