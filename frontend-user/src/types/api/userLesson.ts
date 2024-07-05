import { ELessonType, ESelectionAnswerChoiceList, EUserLessonStatus } from '~/constant/enum/lessonEnum';

export type TUserLessonResponse = {
  userId: string;
  lessonId: string;
  courseId: string;
  status: EUserLessonStatus;
  type: ELessonType;
  checkpoint: TUserVideoLessonCheckpoint | TUserSelectionLessonCheckpoint[] | TUserCodescriptLessonCheckpoint;
};
export type TUserVideoLessonCheckpoint = {
  lastViewMoment: string;
};

export type TUserSelectionLessonCheckpoint = {
  choosenAnswer: ESelectionAnswerChoiceList | null;
  isCorrect: boolean;
  correctAnswer: ESelectionAnswerChoiceList;
};

export type TUserCodescriptLessonCheckpoint = {
  code: string;
  result: boolean[];
};
