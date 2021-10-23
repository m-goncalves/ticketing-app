import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { json } from 'body-parser';
import { body } from 'express-validator';
import { errorHandler, NotFoundError } from '@m-goncalves/common';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test'
}));


app.all('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };