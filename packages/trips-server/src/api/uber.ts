import * as _debug from 'debug';
import * as Uber from 'node-uber';
import * as querystring from 'querystring';
import { EstimateProvider } from './estimate';
import { Location } from './locations';
import Service from './service';

const debug = _debug('app:uber');
const CLIENT_ID = process.env.UBER_CLIENT_ID;

const uber = new Uber({
  client_id:     CLIENT_ID,
  client_secret: process.env.UBER_CLIENT_SECRET,
  server_token:  process.env.UBER_SERVER_TOKEN,
});

/**
 * @see https://developer.uber.com/docs/riders/ride-requests/tutorials/deep-links/introduction#universal-deep-links
 * @param dropoff The latitude/longitude location of the dropoff point.
 * @param flavor The uber flavor (product_id).
 */
function createDeeplink(dropoff: Location, flavor: string) {
  const qs = querystring.stringify({
    client_id: CLIENT_ID,
    action: 'setPickup',
    pickup: 'my_location',
    product_id: flavor,
    'dropoff[latitude]': dropoff.latitude,
    'dropoff[longitude]': dropoff.longitude,
  });

  return `https://m.uber.com/ul/?${qs}`;
}

const provider: EstimateProvider = {
  async getPriceEstimates(start, end) {
    const {
      latitude: startLat,
      longitude: startLon,
    } = start;

    const {
      latitude: endLat,
      longitude: endLon,
    } = end;

    try {
      const prices = await uber.estimates.getPriceForRouteAsync(
          startLat, startLon, endLat, endLon);

      debug('returning prices from uber: %j', prices);
      return prices.prices.map((data) => {
        const link = createDeeplink(end, data.product_id);
        return {
          service: Service.UBER,
          estimate: {
            link,
            flavor: data.display_name,
            duration: data.duration,
            price: {
              high: data.high_estimate * 100,
              low: data.low_estimate * 100,
            },
          },
        };
      });
    } catch (err) {
      const message: string = (err.body && err.body.message)
          || `Failed to get estimate for ${Service.UBER}`;
      debug('returning errors from uber');
      return [{
        service: Service.UBER,
        error: message,
      }];
    }
  },
};

export default provider;
