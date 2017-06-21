import * as Router from 'koa-router';
import * as trips from '../api/trips';

const router = new Router();

router.get('/api/estimate/coords', async function(ctx, next) {
  const { start, end } = ctx.query;
  if (!start) {
    ctx.throw('Query string parameter "start" is required', 400);
  }
  if (!end) {
    ctx.throw('Query string parameter "end" is required', 400);
  }
  const estimates = await trips.getPriceEstimates(start, end);
  ctx.body = estimates;
});

router.get('/api/estimate/address', async function(ctx, next) {
  const { start, end } = ctx.query;
  if (!start) {
    ctx.throw('Query string parameter "start" is required', 400);
  }
  if (!end) {
    ctx.throw('Query string parameter "end" is required', 400);
  }
  const estimates = await trips.getPriceEstimatesByAddress(start, end);
  ctx.body = estimates;
});

export default router;
