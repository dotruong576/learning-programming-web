import { ObjectSchema, object, string } from 'yup';
import validateWrapper, { objectValidateOverride } from '../../common/validator';
import {
  TGetDetailStatisticMemberOfCourseRequest,
  TGetDetailStatisticOfCourseRequest,
} from '../../types/api/statisticTypes';

const getDetailStatisticOfCourseObjectValidate: ObjectSchema<TGetDetailStatisticOfCourseRequest> = object({
  courseId: string().required().trim(),
});

const getDetailStatisticOfMemberOfCourseObjectValudate: ObjectSchema<TGetDetailStatisticMemberOfCourseRequest> = object(
  {
    courseId: string().required().trim(),
    userId: string().required().trim(),
  },
);

const statisticValidator = {
  validateGetDetailStatisticOfCourse: validateWrapper<TGetDetailStatisticOfCourseRequest>((req) =>
    objectValidateOverride(getDetailStatisticOfCourseObjectValidate, req.params as TGetDetailStatisticOfCourseRequest),
  ),
  validateGetDetailStatisticOfMemberOfCourse: validateWrapper<TGetDetailStatisticMemberOfCourseRequest>((req) =>
    objectValidateOverride(
      getDetailStatisticOfMemberOfCourseObjectValudate,
      req.params as TGetDetailStatisticMemberOfCourseRequest,
    ),
  ),
};

export default statisticValidator;
