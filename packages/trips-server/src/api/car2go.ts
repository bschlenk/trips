import * as _debug from 'debug';
import { computeDistance } from './distance';
import { calculateCost, PriceStructure } from './durationpricing';
import { Estimate, EstimateProvider, pricePoint } from './estimate';
import { Location } from './locations';
import Service from './service';

const debug = _debug('app:car2go');

const fees = 100; // driver protection fee

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
  },
};

const displayNames: {[key: string]: string} = {
  FOR_TWO: 'For Two',
  GLA: 'Mercedes-Benz GLA',
  CLA: 'Mercedes-Benz CLA',
};

/**
 * This is a hack. I couldn't find any documentation on opening
 * car2go from a link, but this seems to work. Because we don't know
 * anything about car locations, opening the app is the best we can do.
 * TODO: test on android
 * @see https://www.appsight.io/app/car2go
 */
function createDeepLink() {
  return 'car2go://open';
}

const provider: EstimateProvider = {
  async getPriceEstimates(start: Location, end: Location) {
    try {
      const { distance, duration } = await computeDistance(start, end);
      return Object.entries(pricing).map(([flavor, prices]) => {
        const price = calculateCost(duration, prices) + fees;
        debug('returning data from car2go');
        return {
          service: Service.CAR2GO,
          estimate: {
            duration,
            link: createDeepLink(),
            flavor: displayNames[flavor],
            price: pricePoint(price),
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
  },
};

export default provider;
