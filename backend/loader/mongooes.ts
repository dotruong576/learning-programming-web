import { Express } from 'express';
import mongoose from 'mongoose';
import config from '../config';

const mongooseLoader = async (app: Express) => {
  try {
    await mongoose.connect(config.mongoBD.connnectString.replace('<password>', config.mongoBD.password));
    console.log('Connected MongoDB successfully');
  } catch (error) {
    console.error(error);
  }

  return app;
};

export default mongooseLoader;
