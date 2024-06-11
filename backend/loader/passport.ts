import { Express } from 'express';
import passport from 'passport';

const passportLoader = (app: Express) => {
  app.use(passport.initialize());
  return app;
};

export default passportLoader;
