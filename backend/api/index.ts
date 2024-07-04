import express from 'express';
import authenticateMiddleware, { nonStrictAuthenticateMiddleware } from '../middleware/auth';
import { userRolePermissionMiddleware } from '../middleware/permissionAccess';
import authRoute from './auth/route';
import userRoute from './user/route';
import courseRoute from './course/route';
import userCourseRoute from './userCourses/route';
import fileRoute from './file/route';
import lessonRoute from './lesson/route';
import userLessonRoute from './userLessons/route';
import commentRoute from './comment/route';
const apiRoute = express.Router();

apiRoute.use('/auth', authRoute);
apiRoute.use('/user', authenticateMiddleware, userRoute);
apiRoute.use('/course',courseRoute);
apiRoute.use('/user-courses',nonStrictAuthenticateMiddleware, userCourseRoute);
apiRoute.use('/file',authenticateMiddleware, fileRoute);
apiRoute.use('/lesson',authenticateMiddleware, lessonRoute);
apiRoute.use('/user-lessons',authenticateMiddleware, userRolePermissionMiddleware, userLessonRoute);
apiRoute.use('/comment', commentRoute);


export default apiRoute;