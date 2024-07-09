import { ELessonType, ESelectionAnswerChoiceList, EUserLessonStatus } from '../../constant/enum/lessonEnum';

export type TUserLessonSchema = {
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
};

export type TUserCodescriptLessonCheckpoint = {
  code: string;
  result: boolean[];
};
