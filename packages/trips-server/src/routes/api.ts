import * as Router from 'koa-router';
import * as trips from '../api/trips';
import { Location } from '../api/locations';

const router = new Router();

function parseCoords(value: string): Location {
  const [lat, lng] = value.split(',')
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

router.get('/api/estimates/coords', async function(ctx, next) {
  const { start, end } = ctx.query;
  if (!start) {
    ctx.throw('Query string parameter "start" is required', 400);
  }
  if (!end) {
    ctx.throw('Query string parameter "end" is required', 400);
  }
  const startCoords = parseCoords(start);
  const endCoords = parseCoords(end);
  ctx.body = await trips.getPriceEstimates(startCoords, endCoords);
});

router.get('/api/estimates/address', async function(ctx, next) {
  const { start, end } = ctx.query;
  if (!start) {
    ctx.throw('Query string parameter "start" is required', 400);
  }
  if (!end) {
    ctx.throw('Query string parameter "end" is required', 400);
  }
  ctx.body = await trips.getPriceEstimatesByAddress(start, end);
});

export default router;
