import * as dotenv from 'dotenv';
import { Algorithm } from 'jsonwebtoken';
dotenv.config();

const config = {
  jwt: {
    secret: process.env.JWT_SECRET || '',
    expiredIn: process.env.JWT_EXPIRED || '0',
  },
  mongoBD: {
    connnectString: process.env.MONGODB_CONNECT_STRING || '',
    password: process.env.MONGODB_PASSWORD || '',
  },
  port: process.env.PORT || 3000,
  JWTAlgorithm: 'HS256' as Algorithm,
  firebase:{
    apiKey: process.env.FIREBASE_API_KEY || '',
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.FIREBASE_APP_ID || '',
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || '',
  },
};

export default config;
