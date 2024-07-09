import { ObjectSchema, object, string } from 'yup';
import validateWrapper, { objectValidateOverride } from '../../common/validator';
import { EMAIL_REGEX } from '../../constant/regex';
import { TGetUserDetailByEmail, TGetUserDetailById, TUpdateProfileUser } from '../../types/api/userTypes';

const getUserDetailByIdObjectValidate: ObjectSchema<TGetUserDetailById> = object({
  userId: string().required().trim(),
})
  .noUnknown(true)
  .strict();

const getUserDetailByEmailObjectValidate: ObjectSchema<TGetUserDetailByEmail> = object({
  email: string().required().trim().matches(EMAIL_REGEX),
})
  .noUnknown(true)
  .strict();
const updateProfileUserObjectValidate: ObjectSchema<TUpdateProfileUser> = object({
  password: string().trim(),
  fullName: string().trim(),
  avatar: string().trim(),
})
  .noUnknown(true)
  .strict();
const userValidator = {
  validateGetUserDetailById: validateWrapper((req) =>
    objectValidateOverride(getUserDetailByIdObjectValidate, req.params as TGetUserDetailById),
  ),

  validateGetUserDetailByEmail: validateWrapper<TGetUserDetailByEmail>((req) =>
    objectValidateOverride(getUserDetailByEmailObjectValidate, req.body as TGetUserDetailByEmail),
  ),
  validateUpdateProfileUser: validateWrapper((req) =>
    objectValidateOverride(updateProfileUserObjectValidate, req.body as TUpdateProfileUser),
  ),
};

export default userValidator;
