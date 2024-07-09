import { ESelectionAnswerChoiceList } from '../../constant/enum/lesson.enum';
import {
  TCodescriptLessonResourse,
  TSelectionLessonResourse,
  TVideoLessonResourse,
} from '../../types/schema/lesson.schema.types';

export const codescriptLessonResourceValidator = (_value: TCodescriptLessonResourse[]) => {
  return (
    Array.isArray(_value) && _value.every((item) => typeof item.input === 'string' && typeof item.expected === 'string')
  );
};

export const videoLessonResourceValidator = (_value: TVideoLessonResourse) => {
  return typeof _value.file === 'string' && typeof _value.duration === 'string';
};

export const selectionLessonResourceValidator = (_value: TSelectionLessonResourse[]) => {
  return (
    Array.isArray(_value) &&
    _value.every(
      (item) =>
        typeof item.question === 'string' &&
        typeof item.answerA === 'string' &&
        typeof item.answerB === 'string' &&
        typeof item.answerC === 'string' &&
        typeof item.answerD === 'string' &&
        Object.values(ESelectionAnswerChoiceList).includes(item.correctAnswer),
    )
  );
};
