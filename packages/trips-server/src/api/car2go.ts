import { Location } from './locations';
import { Estimate, EstimateProvider } from './estimate';
import Service from './service';
import { computeDistance } from './distance';
import { calculateCost, PriceStructure } from './durationpricing';

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
  async getPriceEstimates(start: Location, end: Location): Promise<Estimate[]> {
    const { distance, duration } = await computeDistance(start, end);
    return Object.entries(pricing).map(([flavor, prices]) => {
      const price = calculateCost(duration, prices);
      return {
        service: Service.CAR2GO,
        flavor,
        price,
        duration,
      };
    });
  }
};

export default provider;

