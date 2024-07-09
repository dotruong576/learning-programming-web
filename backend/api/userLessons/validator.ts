import { ObjectSchema, array, mixed, object, string } from 'yup';
import validateWrapper, { objectValidateOverride } from '../../common/validator';
import { ELessonType, ESelectionAnswerChoiceList } from '../../constant/enum/lessonEnum';
import {
  TGetResultLesson,
  TSubmitLessonResult,
  TUserCodescriptLessonResultSubmit,
  TUserSelectionLessonResultSubmit,
  TUserVideoLessonResultSubmit,
} from '../../types/api/userLessonTypes';

const postSubmitVideoLessonResultObjectValidate: ObjectSchema<TSubmitLessonResult<TUserVideoLessonResultSubmit>> =
  object({
    lessonId: string().required().trim(),
    courseId: string().required().trim(),
    submit: object({
      lastViewMoment: string().required(),
    }).required(),
  });

const postSubmitSelectionLessonResultObjectValidate: ObjectSchema<
  TSubmitLessonResult<TUserSelectionLessonResultSubmit>
> = object({
  lessonId: string().required().trim(),
  courseId: string().required().trim(),
  submit: array()
    .of(
      object({
        choosenAnswer: mixed<ESelectionAnswerChoiceList>()
          .oneOf(Object.values(ESelectionAnswerChoiceList))
          .required()
          .nullable(),
      }),
    )
    .required(),
});

const postSubmitCodescriptLessonResultObjectValidate: ObjectSchema<
  TSubmitLessonResult<TUserCodescriptLessonResultSubmit>
> = object({
  lessonId: string().required().trim(),
  courseId: string().required().trim(),
  submit: object({
    code: string().required(),
  }).required(),
});

const getResultLessonObjectValidate: ObjectSchema<TGetResultLesson> = object({
  lessonId: string().required().trim(),
  courseId: string().required().trim(),
  type: mixed<ELessonType>().oneOf(Object.values(ELessonType)).required(),
});

export const postSubmitLessonResultParamsObjectValidate: ObjectSchema<{
  type: ELessonType;
}> = object({
  type: mixed<ELessonType>().oneOf(Object.values(ELessonType)).required(),
});

const userLessonValidator = {
  validateSubmitLessonResultQuery: validateWrapper((req) =>
    objectValidateOverride(postSubmitLessonResultParamsObjectValidate, req.query),
  ),
  validateSubmitVideoLessonResult: validateWrapper((req) =>
    objectValidateOverride(
      postSubmitVideoLessonResultObjectValidate,
      req.body as TSubmitLessonResult<TUserVideoLessonResultSubmit>,
    ),
  ),
  validateSubmitSelectionLessonResult: validateWrapper((req) =>
    objectValidateOverride(
      postSubmitSelectionLessonResultObjectValidate,
      req.body as TSubmitLessonResult<TUserSelectionLessonResultSubmit>,
    ),
  ),
  validateSubmitCodescriptLessonResult: validateWrapper((req) =>
    objectValidateOverride(
      postSubmitCodescriptLessonResultObjectValidate,
      req.body as TSubmitLessonResult<TUserCodescriptLessonResultSubmit>,
    ),
  ),
  validateGetResultLesson: validateWrapper((req) =>
    objectValidateOverride(getResultLessonObjectValidate, req.query as TGetResultLesson),
  ),
};

export default userLessonValidator;
