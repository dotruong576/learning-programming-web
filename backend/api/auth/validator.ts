import { ObjectSchema, object, string } from 'yup';
import validateWrapper, { objectValidateOverride } from '../../common/validator';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../constant/regex';
import { TLocalLoginPayload, TRegisterPayload } from '../../types/api/authTypes';

const localLoginObjectValidate: ObjectSchema<TLocalLoginPayload> = object({
  email: string().required().trim().matches(EMAIL_REGEX, { message: 'email format is invalid' }),
  password: string().required().trim().matches(PASSWORD_REGEX, { message: 'password format is invalid' }),
})
  .noUnknown(true)
  .strict();

const registerObjectValidate: ObjectSchema<TRegisterPayload> = object({
  email: string().required().trim().matches(EMAIL_REGEX, { message: 'email format is invalid' }),
  password: string().required().trim().matches(PASSWORD_REGEX, { message: 'password format is invalid' }),
  fullName: string().required().trim(),
})
  .noUnknown(true)
  .strict();

const authValidator = {
  validateLocalLogin: validateWrapper<TLocalLoginPayload>((req) =>
    objectValidateOverride(localLoginObjectValidate, req.body),
  ),
  validateRegister: validateWrapper<TRegisterPayload>((req) =>
    objectValidateOverride(registerObjectValidate, req.body),
  ),
};

export default authValidator;
