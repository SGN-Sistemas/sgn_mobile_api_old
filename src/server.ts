import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import express from 'express';
import cors from 'cors';
import { AppDataSource } from './typeorm/index';

import { routerV1 } from './routes/v1/index.routes';
import Errors from './middlewares/Errors';

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/v1', routerV1);

  app.use(Errors);

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
  });
});
