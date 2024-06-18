import express from 'express';
import authenticateMiddleware, { nonStrictAuthenticateMiddleware } from '../middleware/auth';
import authRoute from './auth/route';
import userRoute from './user/route';
const apiRoute = express.Router();

apiRoute.use('/auth', authRoute);
apiRoute.use('/user', authenticateMiddleware, userRoute);

export default apiRoute;