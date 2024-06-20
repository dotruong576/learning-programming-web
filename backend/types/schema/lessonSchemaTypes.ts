import { ELessonType, ESelectionAnswerChoiceList } from '../../constant/enum/lessonEnum';

export type LessonResource = VideoLessonResourse | SelectionLessonResourse[] | CodescriptLessonResourse[];

export type LessonSchema<T extends LessonResource> = {
  courseId: string;
  title: string;
  description: string;
  type: ELessonType;
  /**total seconds if type === Video, else number (number of questions) */
  duration: number;
  resource: T;
  comments: string[];
};

export type VideoLessonResourse = {
  file: string;
  duration: string;
};

export type SelectionLessonResourse = {
  question: string;
  explanation?: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  correctAnswer: ESelectionAnswerChoiceList;
};

export type CodescriptLessonResourse = {
  input: string;
  expected: string;
};
