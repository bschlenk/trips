import * as Koa from 'koa';
import * as views from 'koa-views';
import * as json from 'koa-json';
import * as onerror from 'koa-onerror';
import * as BodyParser from 'koa-bodyparser';
import * as koastatic from 'koa-static';
import * as logger from 'koa-logger';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

import api from './routes/api';

const app = new Koa();
const bodyparser = BodyParser();

// error handler
onerror(app);

// middlewares
app.use(bodyparser);
app.use(json());
app.use(logger());
app.use(koastatic(join(__dirname, '..', 'public')));

app.use(views(join(__dirname, '..', 'views'), {
  extension: 'jade'
}));

// routes
app.use(api.routes());
app.use(api.allowedMethods());

export default app;
