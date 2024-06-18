import express from 'express';
import userController from './controller';
import userValidator from './validator';

const userRoute = express.Router();

userRoute.get('/email', userValidator.validateGetUserDetailByEmail, userController.getUserByEmail);
userRoute.get('/me', userController.getMe);
userRoute.get('/:userId', userValidator.validateGetUserDetailById, userController.getUserById);

userRoute.put(
  '/',
  (req, res, next) => userValidator.validateUpdateProfileUser(req, res, next),
  (req, res, next) => userController.updateProfileUser(req, res, next),
);
export default userRoute;
