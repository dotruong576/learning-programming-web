import { ObjectSchema, array, object, string } from 'yup';
import validateWrapper, { objectValidateOverride } from '../../common/validator';
import { ECourseStatus } from '../../constant/enum/courseEnum';
import { TCourseById, TCoursePayload, TGetCourseNavigatePayload, TUpdateCourse } from '../../types/api/courseTypes';

const postCourseObjectValidate: ObjectSchema<Omit<TCoursePayload, 'status'>> = object({
  title: string().required(),
  description: string().required(),
  cover: string(),
  lessonIds: array().of(string().required()).default([]),
  label: array().of(string().required()).default([]),
});

const getCourseNavigateValidateObject: ObjectSchema<TGetCourseNavigatePayload> = object({
  courseId: string().required(),
});

const updateCourseObjectValidate = object({
  title: string(),
  description: string(),
  cover: string(),
  lessonIds: array().of(string()).default([]),
  status: string().oneOf([ECourseStatus.Hidden, ECourseStatus.Publish]),
  label: array().of(string()).default([]),
})
  .noUnknown(true)
  .strict() as ObjectSchema<TUpdateCourse>;

const CourseByIdObjectValidate: ObjectSchema<TCourseById> = object({
  courseId: string().required().trim(),
})
  .noUnknown(true)
  .strict();
const courseValidator = {
  validateCousre: validateWrapper((req) =>
    objectValidateOverride(postCourseObjectValidate, req.body as TCoursePayload),
  ),
  validateCourseById: validateWrapper((req) =>
    objectValidateOverride(CourseByIdObjectValidate, req.params as TCourseById),
  ),
  vaidateGetCourseNavigate: validateWrapper((req) =>
    objectValidateOverride(getCourseNavigateValidateObject, req.params as TGetCourseNavigatePayload),
  ),
  validateUpdateCourseById: validateWrapper((req) =>
    objectValidateOverride(updateCourseObjectValidate, req.body as TUpdateCourse),
  ),
};

export default courseValidator;
