import { ObjectSchema, object, string } from 'yup';
import validateWrapper, { objectValidateOverride } from '../../common/validator';
import { TCourseId, TCourseTitle, TUserAndCourseById } from '../../types/api/userCoursesTypes';

const postUserAndCourseByIdObjectValidate: ObjectSchema<TUserAndCourseById> = object({
  courseId: string().required(),
});
const getSearchCourseTitle: ObjectSchema<TCourseTitle> = object({
  courseTitle: string().required(),
});
const getCourseSuggestions: ObjectSchema<TCourseId> = object({
  courseId: string().required(),
});
const userCourseValidator = {
  validateSearchCourseTitle: validateWrapper((req) =>
    objectValidateOverride(getSearchCourseTitle, req.body as TCourseTitle),
  ),
  validateCourseSuggestions: validateWrapper((req) =>
    objectValidateOverride(getCourseSuggestions, req.params as TCourseId),
  ),
  validateUserAndCourseById: validateWrapper((req) =>
    objectValidateOverride(postUserAndCourseByIdObjectValidate, req.body as TUserAndCourseById),
  ),
};

export default userCourseValidator;
