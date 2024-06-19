import { ELessonType, ESelectionAnswerChoiceList } from '../../constant/enum/lessonEnum';

export type TLessonResource = TVideoLessonResourse | TSelectionLessonResourse[] | TCodescriptLessonResourse[];

export type TLessonSchema<T extends TLessonResource> = {
  courseId: string;
  title: string;
  description: string;
  type: ELessonType;
  /**total seconds if type === Video, else number (number of questions) */
  duration: number;
  resource: T;
  comments: string[];
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
