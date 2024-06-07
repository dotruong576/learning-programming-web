import { Express } from 'express';
import morgan from 'morgan';

const loggerLoader = (app: Express) => {
  app.use(morgan('combined'));
  return app;
};

export default loggerLoader;
