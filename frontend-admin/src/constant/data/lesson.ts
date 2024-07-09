import { TSelectionLessonResourse } from '~/types/api/lessonTypes';
import { ESelectionAnswerChoiceList } from '../enum/lessonEnum';

export const defaultSelectionQuestionResource: TSelectionLessonResourse = {
  correctAnswer: ESelectionAnswerChoiceList.A,
  answerA: '',
  answerB: '',
  answerC: '',
  answerD: '',
  question: '',
  explanation: undefined,
};
