import * as Uber from 'node-uber';
import { Estimate, EstimateProvider } from './estimate';
import Service from './service';

const {
  UBER_CLIENT_ID: client_id,
  UBER_CLIENT_SECRET: client_secret,
  UBER_SERVER_TOKEN: server_token,
} = process.env;

const uber = new Uber({
  client_id,
  client_secret,
  server_token,
});

const provider: EstimateProvider = {
  getPriceEstimates(start, end) {
    const {
      latitude: startLat,
      longitude: startLon,
    } = start;

    const {
      latitude: endLat,
      longitude: endLon,
    } = end;

    return uber.estimates.getPriceForRouteAsync(
        startLat, startLon, endLat, endLon).then(prices => {
      return prices.prices.map(data => {
        const estimate: Estimate = {
          service: Service.UBER,
          flavor: data.display_name,
          duration: data.duration,
          price: {
            high: data.high_estimate * 100,
            low: data.low_estimate * 100,
          }
        }
        return estimate;
      });
    })
  }
};

export default provider;
