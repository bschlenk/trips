import { Location } from './locations';
import Service from './service';

export interface PriceRange {
  /** The upper price estimate. */
  high: number
  /** The lower price estimate. */
  low: number
}

export interface Estimate {
    /** The price estimate, in cents. */
    price: number | PriceRange;
    /** The trip dration estimate, in seconds. */
    duration: number;
    /** The name of the ride service. TODO: make an enum? */
    service: Service;
    /** The type of ride, specific to the service. */
    flavor?: string;
}

/**
 * Return a promise containing a list of estimates for the
 * given start and end points.
 */
export interface EstimateProvider {
    getPriceEstimates(start: Location, end: Location): Promise<Estimate[]>;
}
