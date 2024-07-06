import { ELessonType, ESelectionAnswerChoiceList } from '~/constant/enum/lessonEnum';

export type TLessonResource = TVideoLessonResourse | TSelectionLessonResourse[] | TCodescriptLessonResourse[];

export type TCreateLessonPayload<T extends TLessonResource> = {
  title: string;
  courseId: string;
  description: string;
  type: ELessonType;
  resource: T;
};

export type TLessonReponse<T extends TLessonResource> = {
  title: string;
  type: ELessonType;
  resource: T;
  _id: string;
};

export type TVideoLessonResourse = {
  file: string;
  duration: string;
};

export type TSelectionLessonResourse = {
  question: string;
  explanation?: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  correctAnswer: ESelectionAnswerChoiceList;
};

export type TCodescriptLessonResourse = {
  input: string;
  expected: string;
};

export type TGetLessonByIdResponse = {
  title: string;
  description: string;
  type: ELessonType;
  /**total seconds if type === Video, else number (number of questions) */
  resource: TLessonResource;
};
