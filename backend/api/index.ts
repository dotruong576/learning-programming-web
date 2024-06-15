import express from 'express';
import authRoute from './auth/route';
const apiRoute = express.Router();

apiRoute.use('/auth', authRoute);

export default apiRoute;

