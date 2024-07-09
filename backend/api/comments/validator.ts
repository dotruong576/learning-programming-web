import { ObjectSchema, mixed, number, object, string } from 'yup';
import validateWrapper, { objectValidateOverride } from '../../common/validator';
import {
  EUpdateLikeAndDislikeAction,
  TCreateCommentPayload,
  TDeleteCommentPayload,
  TGetCommentByCourseId,
  TGetCommentByLessonId,
  TGetRepliesByCommentId,
  TUpdateCommentPayload,
  TUpdateLikeAndDislike,
} from '../../types/api/commentsTypes';

const createCommentObjectValidate: ObjectSchema<TCreateCommentPayload> = object({
  rating: number(),
  content: string().required(),
  rootCommentId: string(),
  courseId: string(),
  lessonId: string(),
});

const updateCommentObjectValidate: ObjectSchema<TUpdateCommentPayload> = object({
  rating: number(),
  content: string().required(),
  commentId: string().required(),
});

const deleteCommentObjectValidate: ObjectSchema<Pick<TDeleteCommentPayload, 'commentId'>> = object({
  commentId: string().required(),
});

const deleteCommentParamsObjectValidate: ObjectSchema<Omit<TDeleteCommentPayload, 'commentId'>> = object({
  courseId: string(),
  lessonId: string(),
});

const getCommentByCourseIdObjectValidate: ObjectSchema<TGetCommentByCourseId> = object({
  courseId: string().required(),
});

const getCommentByLessonIdObjectValidate: ObjectSchema<TGetCommentByLessonId> = object({
  lessonId: string().required(),
});

const getRepliesByCommentIdObjectValidate: ObjectSchema<TGetRepliesByCommentId> = object({
  commentId: string().required(),
});

const putUpdateLikeAndDislikeObjectValidate: ObjectSchema<TUpdateLikeAndDislike> = object({
  action: mixed<EUpdateLikeAndDislikeAction>().oneOf(Object.values(EUpdateLikeAndDislikeAction)).required(),
  commentId: string().required(),
});

const commentValidator = {
  validateCreateComment: validateWrapper((req) =>
    objectValidateOverride(createCommentObjectValidate, req.body as TCreateCommentPayload),
  ),
  validateUpdateComment: validateWrapper((req) =>
    objectValidateOverride(updateCommentObjectValidate, req.body as TUpdateCommentPayload),
  ),
  validateDeleteComment: validateWrapper((req) =>
    objectValidateOverride(deleteCommentObjectValidate, req.params as Pick<TDeleteCommentPayload, 'commentId'>),
  ),
  validateDeleteCommentQuery: validateWrapper((req) =>
    objectValidateOverride(deleteCommentParamsObjectValidate, req.query as Omit<TDeleteCommentPayload, 'commentId'>),
  ),
  validateGetCommentByCourseId: validateWrapper((req) =>
    objectValidateOverride(getCommentByCourseIdObjectValidate, req.params as TGetCommentByCourseId),
  ),
  validateGetCommentByLessonId: validateWrapper((req) =>
    objectValidateOverride(getCommentByLessonIdObjectValidate, req.params as TGetCommentByLessonId),
  ),
  validateGetRepliesByCommentId: validateWrapper((req) =>
    objectValidateOverride(getRepliesByCommentIdObjectValidate, req.params as TGetRepliesByCommentId),
  ),
  validatePutUpdateLikeAndDislike: validateWrapper((req) =>
    objectValidateOverride(putUpdateLikeAndDislikeObjectValidate, req.body as TUpdateLikeAndDislike),
  ),
};

export default commentValidator;
