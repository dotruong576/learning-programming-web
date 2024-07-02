import express from 'express';
import authenticateMiddleware from '../middleware/auth';
import authRoute from './auth/route';
import userRoute from './user/route';
import courseRoute from './course/route';
const apiRoute = express.Router();

apiRoute.use('/auth', authRoute);
apiRoute.use('/user', authenticateMiddleware, userRoute);
apiRoute.use('/course',courseRoute);

export default apiRoute;