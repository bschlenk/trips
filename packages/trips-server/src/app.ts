import * as Koa from 'koa';
import * as json from 'koa-json';
import * as onerror from 'koa-onerror';
import * as BodyParser from 'koa-bodyparser';
import * as cors from 'koa-cors';
import * as logger from 'koa-logger';
import * as dotenv from 'dotenv-safe';
import { join } from 'path';

dotenv.load();

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
  origin: 'http://trips.bschlenk.com',
}));

// routes
app.use(api.routes());
app.use(api.allowedMethods());

export default app;
