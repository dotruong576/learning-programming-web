import express from 'express';
import { EUserRole } from '../../constant/enum/user.enum';
import authenticateMiddleware, { nonStrictAuthenticateMiddleware } from '../../middleware/auth';
import { userRolePermissionMiddleware } from '../../middleware/permissionAccess';
import courseControllers from './controller';
import courseValidator from './validator';
const courseRoute = express.Router();

courseRoute.post(
  '/create-course',
  authenticateMiddleware,
  userRolePermissionMiddleware([EUserRole.Admin]),
  (req, res, next) => courseValidator.validateCousre(req, res, next),
  (req, res, next) => courseControllers.createCourse(req, res, next),
);
courseRoute.get('/all', courseControllers.getAllCourses);

courseRoute.get(
  '/course-navigate/:courseId',
  authenticateMiddleware,
  courseValidator.vaidateGetCourseNavigate,
  courseControllers.getCourseNavigate,
);

courseRoute.post(
  '/status/:courseId',
  authenticateMiddleware,
  userRolePermissionMiddleware([EUserRole.Admin]),
  courseValidator.validateCourseById,
  courseControllers.changeStatus,
);

courseRoute.get(
  '/:courseId',
  nonStrictAuthenticateMiddleware,
  courseValidator.validateCourseById,
  courseControllers.getCourseById,
);

courseRoute.delete(
  '/:courseId',
  authenticateMiddleware,
  userRolePermissionMiddleware([EUserRole.Admin]),
  courseValidator.validateCourseById,
  courseControllers.deleteCourseById,
);
courseRoute.put(
  '/:courseId',
  authenticateMiddleware,
  userRolePermissionMiddleware([EUserRole.Admin]),
  (req, res, next) => courseValidator.validateUpdateCourseById(req, res, next),
  (req, res, next) => courseControllers.updateCourseById(req, res, next),
);
export default courseRoute;
