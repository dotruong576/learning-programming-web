import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import apiRoute from '../api';

const expressLoader = (app: Express) => {
  app.use(express.json());
  app.use(helmet());
  app.use(
    cors({
      credentials: true,
      origin: [/^http:\/\/localhost/, /^http:\/\/127.0.0.1/, /127.0.0.1/],
    }),
  );

  app.use(compression());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/static', express.static('public'));

  app.use('/api/v1', apiRoute); // Root

  app.get('/test-url', (req, res) => {
    console.log(req.body);
    return res.send(req.body);
  });
};

export default expressLoader;
