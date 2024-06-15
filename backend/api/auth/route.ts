import express from 'express';
import authController from './controller';
import authValidator from './validator';

const authRoute = express.Router();

authRoute.post('/register', authValidator.validateRegister, authController.register);
authRoute.post('/login', authValidator.validateLocalLogin, authController.loginWithEmailAndPassword);
authRoute.post('/logout', authController.logout);

export default authRoute;
