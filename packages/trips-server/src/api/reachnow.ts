import * as _debug from 'debug';
import { Location } from './locations';
import { Estimate, EstimateProvider, pricePoint } from './estimate';
import Service from './service';
import { computeDistance } from './distance';
import { calculateCost, PriceStructure } from './durationpricing';

const debug = _debug('app:car2go');

const pricing: PriceStructure = {
  minute: 41,
  hour: 2000,
  day: 8000,
};

const provider: EstimateProvider = {
  async getPriceEstimates(start: Location, end: Location) {
    try {
      const { distance, duration } = await computeDistance(start, end);
      const price = calculateCost(duration, pricing);
      debug('returning data from reachnow');
      return [
        {
          service: Service.REACH_NOW,
          estimate: {
            price: pricePoint(price),
            duration,
          },
        },
      ];
    } catch (err) {
      debug('returning error from reachnow: %j', err);
      return [{
        service: Service.REACH_NOW,
        error: `Failed to find estimate for reachnow: ${err.message}`,
      }];
    }
  }
};

export default provider;

