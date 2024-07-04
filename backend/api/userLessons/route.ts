import express from 'express';
import { ELessonType } from '../../constant/enum/lessonEnum';
import userLessonController from './controller';
import userLessonValidator from './validator';

const userLessonRoute = express.Router();

const hashValidateAndController = {
  [ELessonType.CodeScript]: {
    validator: userLessonValidator.validateSubmitCodescriptLessonResult,
    controller: userLessonController.postCodescriptLessonResult,
  },
  [ELessonType.Video]: {
    validator: userLessonValidator.validateSubmitVideoLessonResult,
    controller: userLessonController.postVideoLessonResult,
  },
  [ELessonType.Selection]: {
    validator: userLessonValidator.validateSubmitSelectionLessonResult,
    controller: userLessonController.postSelectionLessonResult,
  },
};

userLessonRoute.post(
  '/result',
  userLessonValidator.validateSubmitLessonResultQuery,
  (req, res, next) => hashValidateAndController[req.query.type as ELessonType].validator(req, res, next),
  (req, res, next) => hashValidateAndController[req.query.type as ELessonType].controller(req, res, next),
);

userLessonRoute.get('/result', userLessonValidator.validateGetResultLesson, userLessonController.getResultLesson);

export default userLessonRoute;
