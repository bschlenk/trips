import * as _debug from 'debug';
import Lyft, { RideType } from 'lyft-client';
import * as querystring from 'querystring';
import { EstimateProvider, EstimateResult } from './estimate';
import { Location } from './locations';
import Service from './service';

const debug = _debug('app:lyft');

const { LYFT_CLIENT_ID, LYFT_CLIENT_SECRET } = process.env;

const LYFT = new Lyft(LYFT_CLIENT_ID!, LYFT_CLIENT_SECRET!);

/**
 * @see https://developer.lyft.com/docs/universal-links
 */
function createDeepLink(start: Location, end: Location, flavor: RideType) {
  const qs = querystring.stringify({
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
  async getPriceEstimates(
    start: Location,
    end: Location,
  ): Promise<EstimateResult[]> {
    try {
      const response = await LYFT.getRideEstimates({ start, end });
      debug('returning estimates for %d lyft services', response.length);

      return response.map(ride => {
        const link = createDeepLink(start, end, ride.rideType);
        return {
          service: Service.LYFT,
          estimate: {
            link,
            flavor: ride.displayName,
            duration: ride.estimatedDurationSeconds,
            price: {
              high: ride.estimatedCostCentsMax,
              low: ride.estimatedCostCentsMin,
            },
          },
        };
      });
    } catch (err) {
      debug('returning error from lyft: %j', err);
      return [
        {
          service: Service.LYFT,
          error: `There was an error getting an estimate from Lyft: ${
            err.message
          }`,
        },
      ];
    }
  },
};

export default provider;
