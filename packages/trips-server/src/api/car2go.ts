import { Location } from './locations';
import { Estimate, EstimateProvider } from './estimate';

interface PriceStructure {
  /** The price per minute. */
  minute: number
  /** The price per hour. */
  hour: number
  /** The price per day. */
  day: number
}

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

const provider: EstimateProvider = {
  getPriceEstimates(start: Location, end: Location): Promise<Estimate[]> {
    // TODO: calculate time to drive between start and end
    // calculate price using the above breakdowns
    return Promise.resolve([]);
  }
};

export default provider;

