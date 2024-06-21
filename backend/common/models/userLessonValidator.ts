import { ESelectionAnswerChoiceList } from '../../constant/enum/lessonEnum';
import {
  UserCodescriptLessonCheckpoint,
  UserSelectionLessonCheckpoint,
  UserVideoLessonCheckpoint,
} from '../../types/schema/userLessonSchemaTypes';

export const codescriptUserLessonCheckpointValidator = (_value: UserCodescriptLessonCheckpoint) => {
  return (
    typeof _value.code === 'string' &&
    Array.isArray(_value.result) &&
    _value.result.every((item) => typeof item === 'boolean')
  );
};

export const videoUserLessonCheckpointValidator = (_value: UserVideoLessonCheckpoint) => {
  return typeof _value.lastViewMoment === 'string';
};

export const selectionLessonResourceValidator = (_value: UserSelectionLessonCheckpoint[]) => {
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
