import * as _debug from 'debug';
import * as Lyft from 'lyft-node';
import * as querystring from 'querystring';
import { Estimate, EstimateProvider, EstimateResult } from './estimate';
import { Location } from './locations';
import Service from './service';

const debug = _debug('app:lyft');

const {
  LYFT_CLIENT_ID,
  LYFT_CLIENT_SECRET,
} = process.env;

const lyft = new Lyft(LYFT_CLIENT_ID!, LYFT_CLIENT_SECRET!);

const rideTypes: Lyft.RideType[] = [
  'lyft',
  'lyft_line',
  'lyft_plus',
];

/**
 * @see https://developer.lyft.com/docs/universal-links
 */
function createDeepLink(start: Location, end: Location, flavor: Lyft.RideType) {
  const qs = querystring.stringify({
    // TODO: can this not be lyft_line?
    id: flavor,
    partner: LYFT_CLIENT_ID,
    'pickup[latitude]': start.latitude,
    'pickup[longitude]': start.longitude,
    'destination[latitude]': end.latitude,
    'destination[longitude]': end.longitude,
  });

  return `https://lyft.com/ride?${qs}`;
}

const provider: EstimateProvider = {
  getPriceEstimates(start: Location, end: Location): Promise<EstimateResult[]> {
    return Promise.all(rideTypes.map(async (rideType) => {
      try {
        const response = await lyft.getRideEstimates({ start, end, rideType });
        const data = response.cost_estimates[0];
        if (data.error_message) {
          return {
            service: Service.LYFT,
            error: data.error_message,
          };
        }

        debug('returning data from lyft');
        const link = createDeepLink(start, end, rideType);
        return {
          service: Service.LYFT,
          estimate: {
            link,
            flavor: data.display_name,
            duration: data.estimated_duration_seconds,
            price: {
              high: data.estimated_cost_cents_max,
              low: data.estimated_cost_cents_min,
            },
          },
        };
      } catch (err) {
        debug('returning error from lyft: %j', err);
        return {
          service: Service.LYFT,
          error: `There was an error getting an estimate from Lyft: ${err.message}`,
        };
      }
    }));
  },
};

export default provider;
