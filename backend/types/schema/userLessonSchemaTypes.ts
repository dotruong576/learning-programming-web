import { ELessonType, ESelectionAnswerChoiceList, EUserLessonStatus } from '../../constant/enum/lessonEnum';

export type UserLessonSchema = {
  userId: string;
  lessonId: string;
  courseId: string;
  status: EUserLessonStatus;
  type: ELessonType;
  checkpoint: UserVideoLessonCheckpoint | UserSelectionLessonCheckpoint[] | UserCodescriptLessonCheckpoint;
};
export type UserVideoLessonCheckpoint = {
  lastViewMoment: string;
};

export type UserSelectionLessonCheckpoint = {
  choosenAnswer: ESelectionAnswerChoiceList | null;
  isCorrect: boolean;
};

export type UserCodescriptLessonCheckpoint = {
  code: string;
  result: boolean[];
};
