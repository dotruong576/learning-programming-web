import { ELessonType, ESelectionAnswerChoiceList } from '../../constant/enum/lessonEnum';
import { TUserLessonSchema } from '../schema/userLessonsSchemaTypes';

export type TSubmitLessonResult<T> = {
  lessonId: string;
  courseId: string;
  submit: T;
};

export type TUserVideoLessonResultSubmit = {
  lastViewMoment: string;
};

export type TUserSelectionLessonResultSubmit = {
  choosenAnswer: ESelectionAnswerChoiceList | null;
}[];

export type TUserCodescriptLessonResultSubmit = {
  code: string;
};

export type TGetResultLesson = {
  lessonId: string;
  courseId: string;
  type: ELessonType;
};

export type TUserVideoLessonCheckpointResponse = {
  lastViewMoment: string;
};

export type TUserSelectionLessonCheckpointResponse = {
  choosenAnswer: ESelectionAnswerChoiceList | null;
  isCorrect: boolean;
  correctAnswer: ESelectionAnswerChoiceList;
};

export type TUserCodescriptLessonCheckpointResponse = {
  code: string;
  result: boolean[];
};

export type TGetResultLessonResponse = Omit<TUserLessonSchema, 'checkpoint'> & {
  checkpoint:
    | TUserVideoLessonCheckpointResponse
    | TUserSelectionLessonCheckpointResponse[]
    | TUserCodescriptLessonCheckpointResponse;
};
