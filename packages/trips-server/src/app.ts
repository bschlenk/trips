import * as Koa from 'koa';
import * as BodyParser from 'koa-bodyparser';
import * as json from 'koa-json';
import * as logger from 'koa-logger';
import * as onerror from 'koa-onerror';
import * as cors from 'koa2-cors';
import { join } from 'path';

// this must be done before loading roues
import './load-env';

import api from './routes/api';

const app = new Koa();
const bodyparser = BodyParser();

// error handler
onerror(app);

// middlewares
app.use(bodyparser);
app.use(json());
app.use(logger());
app.use(cors({
  origin: process.env.ALLOW_ORIGIN,
}));

// routes
app.use(api.routes());
app.use(api.allowedMethods());

export default app;
