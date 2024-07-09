import { ESelectionAnswerChoiceList } from '../../constant/enum/lesson.enum';
import {
  TUserCodescriptLessonCheckpoint,
  TUserSelectionLessonCheckpoint,
  TUserVideoLessonCheckpoint,
} from '../../types/schema/userLessons.schema.types';

export const codescriptUserLessonCheckpointValidator = (_value: TUserCodescriptLessonCheckpoint) => {
  return (
    typeof _value.code === 'string' &&
    Array.isArray(_value.result) &&
    _value.result.every((item) => typeof item === 'boolean')
  );
};

export const videoUserLessonCheckpointValidator = (_value: TUserVideoLessonCheckpoint) => {
  return typeof _value.lastViewMoment === 'string';
};

export const selectionLessonResourceValidator = (_value: TUserSelectionLessonCheckpoint[]) => {
  return (
    Array.isArray(_value) &&
    _value.every(
      (item) =>
        ((typeof item.choosenAnswer === 'string' &&
          Object.values(ESelectionAnswerChoiceList).includes(item.choosenAnswer)) ||
          item.choosenAnswer == null) &&
        typeof item.isCorrect === 'boolean',
    )
  );
};
