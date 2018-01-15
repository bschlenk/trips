declare module 'lyft-node' {
  class Lyft {
    constructor(clientId: string, clientSecret: string);

    getRideEstimates: (options: Lyft.RideEstimateOptions)
      => Promise<Lyft.RideEstimate>;
  }

  namespace Lyft {
    interface RideEstimateOptions {
      start: Location,
      end: Location,
      rideType: RideType,
    }

    interface RideEstimate {
      cost_estimates: CostEstimate[],
    }

    interface CostEstimate {
      ride_type: RideType,
      estimated_duration_seconds: number,
      estimated_cost_cents_min: number,
      estimated_cost_cents_max: number,
    }

    type RideType = 'lyft' | 'lyft_line' | 'lyft_plus';

    interface Location {
      latitude: number;
      longitude: number;
    }
  }

  export = Lyft;
}
