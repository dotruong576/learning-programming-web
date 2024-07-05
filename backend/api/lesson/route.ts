import express from 'express';
import { ELessonType } from '../../constant/enum/lessonEnum';
import { EUserRole } from '../../constant/enum/userEnum';
import { userRolePermissionMiddleware } from '../../middleware/permissionAccess';
import lessonController from './controller';
import lessonValidator from './validator';

const lessonRoute = express.Router();

const createLesson = {
  [ELessonType.Video]: {
    validator: lessonValidator.validateVideoLesson,
    controller: lessonController.createLesson,
  },
  [ELessonType.Selection]: {
    validator: lessonValidator.validateSelectionLesson,
    controller: lessonController.createLesson,
  },
  [ELessonType.CodeScript]: {
    validator: lessonValidator.validateCodescriptLesson,
    controller: lessonController.createLesson,
  },
};

const updateLesson = {
  [ELessonType.Video]: {
    validator: lessonValidator.validateVideoLesson,
    controller: lessonController.updateLessonById,
  },
  [ELessonType.Selection]: {
    validator: lessonValidator.validateSelectionLesson,
    controller: lessonController.updateLessonById,
  },
  [ELessonType.CodeScript]: {
    validator: lessonValidator.validateCodescriptLesson,
    controller: lessonController.updateLessonById,
  },
};
lessonRoute.post(
  '/create-lesson',
  userRolePermissionMiddleware([EUserRole.Admin]),
  lessonValidator.validateLessonResultQuery,
  (req, res, next) => createLesson[req.query.type as ELessonType].validator(req, res, next),
  (req, res, next) => createLesson[req.query.type as ELessonType].controller(req, res, next),
);
lessonRoute.get('/:lessonId', lessonValidator.validateLessonById, lessonController.getLessonById);
lessonRoute.delete(
  '/:lessonId',
  userRolePermissionMiddleware([EUserRole.Admin]),
  lessonValidator.validateLessonById,
  lessonController.deleteLessonById,
);
lessonRoute.put(
  '/:lessonId',
  userRolePermissionMiddleware([EUserRole.Admin]),
  lessonValidator.validateLessonById,
  (req, res, next) => updateLesson[req.query.type as ELessonType].validator(req, res, next),
  (req, res, next) => updateLesson[req.query.type as ELessonType].controller(req, res, next),
  lessonController.updateLessonById,
);
export default lessonRoute;
