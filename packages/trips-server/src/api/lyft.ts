import * as Lyft from 'lyft-node';
import { Location } from './locations';
import Service from './service';
import { Estimate, EstimateProvider } from './estimate';

const {
  LYFT_CLIENT_ID,
  LYFT_CLIENT_SECRET,
} = process.env;

const lyft = new Lyft(LYFT_CLIENT_ID, LYFT_CLIENT_SECRET);

const rideTypes: Lyft.RideType[] = [
  'lyft',
  'lyft_line',
  'lyft_plus',
];

const provider: EstimateProvider = {
  getPriceEstimates(start: Location, end: Location): Promise<Estimate[]> {
    return Promise.all(rideTypes.map(rideType => {
      return lyft.getRideEstimates({
        start,
        end,
        rideType,
      }).then(response => {
        const data = response.cost_estimates[0];
        return {
          service: Service.LYFT,
          flavor: data.ride_type,
          duration: data.estimated_duration_seconds,
          price: {
            high: data.estimated_cost_cents_max,
            low: data.estimated_cost_cents_min,
          },
        };
      });
    }));
  }
};

export default provider;
