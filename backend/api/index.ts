import express from 'express';
import authenticateMiddleware, { nonStrictAuthenticateMiddleware } from '../middleware/auth';
import authRoute from './auth/route';
import userRoute from './user/route';
import courseRoute from './course/route';
import userCourseRoute from './userCourses/route';
import fileRoute from './file/route';
const apiRoute = express.Router();

apiRoute.use('/auth', authRoute);
apiRoute.use('/user', authenticateMiddleware, userRoute);
apiRoute.use('/course',courseRoute);
apiRoute.use('/user-courses',nonStrictAuthenticateMiddleware, userCourseRoute);
apiRoute.use('/file',authenticateMiddleware, fileRoute);


export default apiRoute;