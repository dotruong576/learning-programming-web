import { ObjectSchema, array, mixed, object, string } from 'yup';
import validateWrapper, { objectValidateOverride } from '../../common/validator';
import { ELessonType, ESelectionAnswerChoiceList } from '../../constant/enum/lesson.enum';
import { TCreateLessonPayload, TLessonById } from '../../types/api/lesson.types';
import {
  TCodescriptLessonResourse,
  TSelectionLessonResourse,
  TVideoLessonResourse,
} from '../../types/schema/lesson.schema.types';

const postLessonResultParamsObjectValidate: ObjectSchema<{
  type: ELessonType;
}> = object({
  type: mixed<ELessonType>().oneOf(Object.values(ELessonType)).required(),
});

const postVideoLessonObjectValidate: ObjectSchema<TCreateLessonPayload<TVideoLessonResourse>> = object({
  courseId: string().required().trim(),
  title: string().required(),
  description: string().required(),
  resource: object({
    file: string().required('Video file is required'),
    duration: string().required('Video duration is required'),
  }).required('Video Resource is required'),
});

const postCodeScriptLessonObjectValidate: ObjectSchema<TCreateLessonPayload<TCodescriptLessonResourse[]>> = object({
  courseId: string().required().trim(),
  title: string().required(),
  description: string().required(),
  resource: array()
    .of(
      object().shape({
        input: string().required('Code input is required'),
        expected: string().required('Expected output is required'),
      }),
    )
    .required('CodeScript Resource is required'),
});

const postSelectionLessonObjectValidate: ObjectSchema<TCreateLessonPayload<TSelectionLessonResourse[]>> = object({
  courseId: string().required().trim(),
  title: string().required(),
  description: string().required(),
  resource: array()
    .of(
      object().shape({
        question: string().required('Question is required'),
        answerA: string().required('Answer A is required'),
        answerB: string().required('Answer B is required'),
        answerC: string().required('Answer C is required'),
        answerD: string().required('Answer D is required'),
        correctAnswer: string().oneOf(Object.values(ESelectionAnswerChoiceList)).required('Correct Answer is required'),
      }),
    )
    .required('Selection Resource is required'),
});

const LessonByIdObjectValidate: ObjectSchema<TLessonById> = object({
  lessonId: string().required().trim(),
})
  .noUnknown(true)
  .strict();

const lessonValidator = {
  validateLessonResultQuery: validateWrapper((req) =>
    objectValidateOverride(postLessonResultParamsObjectValidate, req.query),
  ),
  validateVideoLesson: validateWrapper((req) =>
    objectValidateOverride(postVideoLessonObjectValidate, req.body as TCreateLessonPayload<TVideoLessonResourse>),
  ),
  validateCodescriptLesson: validateWrapper((req) =>
    objectValidateOverride(
      postCodeScriptLessonObjectValidate,
      req.body as TCreateLessonPayload<TCodescriptLessonResourse[]>,
    ),
  ),
  validateSelectionLesson: validateWrapper((req) =>
    objectValidateOverride(
      postSelectionLessonObjectValidate,
      req.body as TCreateLessonPayload<TSelectionLessonResourse[]>,
    ),
  ),
  validateLessonById: validateWrapper((req) =>
    objectValidateOverride(LessonByIdObjectValidate, req.params as TLessonById),
  ),
};

export default lessonValidator;
