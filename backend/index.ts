import express, { Express } from 'express';
import config from './config';
import appLoader from './loader';

const app: Express = express();

appLoader(app);

app.listen(config.port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${config.port}`);
});