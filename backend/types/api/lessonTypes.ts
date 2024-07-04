import { LessonResource } from '../schema/lessonSchemaTypes';

export type TLessonById = {
  lessonId: string;
};

export type TCreateLessonPayload<T extends LessonResource> = {
  courseId: string;
  title: string;
  description: string;
  /**total seconds if type === Video, else number (number of questions) */
  resource: T;
};
