import { Express } from 'express';
import expressLoader from './express';
import loggerLoader from './logger';
import mongooseLoader from './mongooes';
import passportLoader from './passport';

const appLoader = (app: Express) => {
  expressLoader(app);

  loggerLoader(app);
  passportLoader(app);

  mongooseLoader(app);
  return app;
};

export default appLoader;
