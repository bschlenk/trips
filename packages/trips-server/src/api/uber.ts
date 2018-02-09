import * as _debug from 'debug';
import * as Uber from 'node-uber';
import { Estimate, EstimateProvider } from './estimate';
import Service from './service';

const debug = _debug('app:uber');

const uber = new Uber({
  client_id:     process.env.UBER_CLIENT_ID,
  client_secret: process.env.UBER_CLIENT_SECRET,
  server_token:  process.env.UBER_SERVER_TOKEN,
});

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

      debug('returning prices from uber');
      return prices.prices.map((data) => {
        return {
          service: Service.UBER,
          estimate: {
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
