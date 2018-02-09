import * as Router from 'koa-router';
import { Location } from '../api/locations';
import * as trips from '../api/trips';

const router = new Router();

router.get('/api/estimates/coords', async (ctx, next) => {
  const { start, end } = ctx.query;
  validateStartEnd(ctx, start, end);
  const startCoords = parseCoords(start);
  const endCoords = parseCoords(end);
  try {
    ctx.body = await trips.getPriceEstimates(startCoords, endCoords);
  } catch (err) {
    ctx.throw(err);
  }
});

router.get('/api/estimates/address', async (ctx, next) => {
  const { start, end } = ctx.query;
  validateStartEnd(ctx, start, end);
  ctx.body = await trips.getPriceEstimatesByAddress(start, end);
});

function parseCoords(value: string): Location {
  const [lat, lng] = value.split(',');
  if (!lat || !lng) {
    throw new Error(
      'Coordinates must be given in the form "<latitude>,<longitude>"');
  }
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);
  if (isNaN(latitude) || isNaN(longitude)) {
    throw new Error(`latitude or longitude is not a number: ${lat},${lng}`);
  }
  return { latitude, longitude };
}

function validateStartEnd(
  ctx: Router.IRouterContext,
  start: string,
  end: string,
) {
  if (!start) {
    ctx.throw('Query string parameter "start" is required', 400);
  }
  if (!end) {
    ctx.throw('Query string parameter "end" is required', 400);
  }
}

export default router;
