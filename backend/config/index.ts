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
};

export default config;
