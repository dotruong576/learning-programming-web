import express from 'express';
import authenticateMiddleware from '../../middleware/auth';
import userCourseControllers from './controller';
import userCourseValidator from './validator';

const userCourseRoute = express.Router();

userCourseRoute.post(
  '/user-join-course',
  authenticateMiddleware,
  (req, res, next) => userCourseValidator.validateUserAndCourseById(req, res, next),
  (req, res, next) => userCourseControllers.userJoinCourseById(req, res, next),
);
userCourseRoute.delete(
  '/user-join-course',
  authenticateMiddleware,
  (req, res, next) => userCourseValidator.validateUserAndCourseById(req, res, next),
  (req, res, next) => userCourseControllers.deleteUserJoinedCourseById(req, res, next),
);
userCourseRoute.post(
  '/search-course',
  (req, res, next) => userCourseValidator.validateSearchCourseTitle(req, res, next),
  (req, res, next) => userCourseControllers.searchCourseTitle(req, res, next),
);
userCourseRoute.get(
  '/course-suggestions/:courseId',
  (req, res, next) => userCourseValidator.validateCourseSuggestions(req, res, next),
  (req, res, next) => userCourseControllers.getCourseSuggestions(req, res, next),
);
export default userCourseRoute;
