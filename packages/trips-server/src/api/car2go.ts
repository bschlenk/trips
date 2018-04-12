import * as _debug from 'debug';
import { computeDistance } from './distance';
import { calculateCost, PriceStructure } from './durationpricing';
import { Estimate, EstimateProvider, pricePoint } from './estimate';
import { Location } from './locations';
import Service from './service';

const debug = _debug('app:car2go');

const FEES = 100; // driver protection fee
const TAX_RATE = .178;
const PER_MINUTE_RATE = 45;

/**
 * Car2Go has changed their pricing model, and it is different per supported
 * location. For now we are only supporting the Seattle location.
 * See https://www.car2go.com/US/en/seattle/how/ for more information.
 *
 * Minutes are now bought in prepaid packs. If you go over this prepaid amount,
 * each additional minute is $0.45. (for now, looks like it will go up to $0.49)
 *
 * 30minutes = $9
 * 60minutes = $19
 * 120minutes = $29
 * 240minutes = $55
 * 1440minutes = $79
 */

const packages = [
  {
    name: 'Pay Per Minute',
    minutes: 0,
    cost: 0,
    rate: PER_MINUTE_RATE,
  },
  {
    name: '30-Minute Package',
    minutes: 30,
    cost: 900,
    rate: PER_MINUTE_RATE,
  },
  {
    name: '1-Hour Package',
    minutes: 60,
    cost: 1900,
    rate: PER_MINUTE_RATE,
  },
  {
    name: '2-Hour Package',
    minutes: 120,
    cost: 2900,
    rate: PER_MINUTE_RATE,
  },
  {
    name: '4-Hour Package',
    minutes: 240,
    cost: 5500,
    rate: PER_MINUTE_RATE,
  },
  {
    name: '1-Day Package',
    minutes: 1440,
    cost: 7900,
    rate: PER_MINUTE_RATE,
  },
  {
    name: '2-Day Package',
    minutes: 2880,
    cost: 15900,
    rate: PER_MINUTE_RATE,
  },
];

interface Pricing {
  name: string;
  cost: number;
}

/**
 * @param duration The duration in minutes.
 */
function calculateCostPerPackage(duration: number): Pricing[] {
  const pricingArray = [];
  for (const pkg of packages) {
    let totalCost = pkg.cost;
    const minutesRemaining = Math.max(0, duration - pkg.minutes);
    totalCost += minutesRemaining * pkg.rate;
    pricingArray.push({
      name: pkg.name,
      cost: totalCost,
    });
    if (pkg.minutes > duration) {
      // no reason to see any more package costs
      break;
    }
  }
  return pricingArray;
}

function updatePrice(inputPrice: number): number {
  const price = inputPrice + FEES;
  const tax = price * TAX_RATE;
  return price + tax;
}

/**
 * This is a hack. I couldn't find any documentation on opening
 * car2go from a link, but this seems to work. Because we don't know
 * anything about car locations, opening the app is the best we can do.
 * TODO: This does not work on android.
 * @see https://www.appsight.io/app/car2go
 */
function createDeepLink() {
  return 'car2go://open';
}

const provider: EstimateProvider = {
  async getPriceEstimates(start: Location, end: Location) {
    try {
      const { distance, duration } = await computeDistance(start, end);
      debug('calculating car2go prices from duration %d', duration);
      const durationMinutes = duration / 60;
      return calculateCostPerPackage(durationMinutes).map(({ name, cost }) => {
        return {
          service: Service.CAR2GO,
          estimate: {
            duration,
            link: createDeepLink(),
            flavor: name,
            price: pricePoint(updatePrice(cost)),
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
