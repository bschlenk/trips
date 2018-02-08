import * as _debug from 'debug';
import { Location } from './locations';
import { Estimate, EstimateProvider } from './estimate';
import Service from './service';
import { computeDistance } from './distance';
import { calculateCost, PriceStructure } from './durationpricing';

const debug = _debug('app:car2go');

const pricing: {[key: string]: PriceStructure} = {
  FOR_TWO: {
    minute: 35,
    hour: 1500,
    day: 5900,
  },
  GLA: {
    minute: 45,
    hour: 1900,
    day: 7900,
  },
  CLA: {
    minute: 45,
    hour: 1900,
    day: 7900,
  }
};

const displayNames: {[key: string]: string} = {
  FOR_TWO: 'For Two',
  GLA: 'Mercedes-Benz GLA',
  CLA: 'Mercedes-Benz CLA',
};

const provider: EstimateProvider = {
  async getPriceEstimates(start: Location, end: Location) {
    try {
      const { distance, duration } = await computeDistance(start, end);
      return Object.entries(pricing).map(([flavor, prices]) => {
        const price = calculateCost(duration, prices);
        debug('returning data from car2go');
        return {
          service: Service.CAR2GO,
          estimate: {
            flavor: displayNames[flavor],
            price: {
              high: price,
              low: price,
            },
            duration,
          },
        };
      });
    } catch (err) {
      debug('returning error from car2go: %j', err);
      return [{
        service: Service.CAR2GO,
        error: `Failed to find estimate for car2go: ${err.message}`,
      }];
    }
  }
};

export default provider;

