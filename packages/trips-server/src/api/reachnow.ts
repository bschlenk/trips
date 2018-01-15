import { Location } from './locations';
import { Estimate, EstimateProvider } from './estimate';
import Service from './service';
import { computeDistance } from './distance';
import { calculateCost, PriceStructure } from './durationpricing';

const pricing: PriceStructure = {
  minute: 41,
  hour: 2000,
  day: 8000,
};

const provider: EstimateProvider = {
  async getPriceEstimates(start: Location, end: Location): Promise<Estimate[]> {
    const { distance, duration } = await computeDistance(start, end);
    const price = calculateCost(duration, pricing);
    return [
      {
        service: Service.REACH_NOW,
        price,
        duration,
      },
    ];
  }
};

export default provider;

