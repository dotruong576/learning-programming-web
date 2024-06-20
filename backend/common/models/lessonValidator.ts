import { ESelectionAnswerChoiceList } from '../../constant/enum/lessonEnum';
import {
  CodescriptLessonResourse,
  SelectionLessonResourse,
  VideoLessonResourse,
} from '../../types/schema/lessonSchemaTypes';

export const codescriptLessonResourceValidator = (_value: CodescriptLessonResourse[]) => {
  return (
    Array.isArray(_value) && _value.every((item) => typeof item.input === 'string' && typeof item.expected === 'string')
  );
};

export const videoLessonResourceValidator = (_value: VideoLessonResourse) => {
  return typeof _value.file === 'string' && typeof _value.duration === 'string';
};

export const selectionLessonResourceValidator = (_value: SelectionLessonResourse[]) => {
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
