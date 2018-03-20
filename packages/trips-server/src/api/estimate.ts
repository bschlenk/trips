import { Location } from './locations';
import Service from './service';

export interface PriceRange {
  /** The upper price estimate. */
  high: number;
  /** The lower price estimate. */
  low: number;
}

export interface EstimateResult {
  /** The name of the ride service. */
  service: Service;
  /** The estimate object. */
  estimate?: Estimate;
  /** The error that occured, if any. */
  error?: string;
}

export interface Estimate {
  /** The price estimate, in cents. */
  price: PriceRange;
  /** The trip dration estimate, in seconds. */
  duration: number;
  /** The type of ride, specific to the service. */
  flavor?: string;
  /** The url/deeplink to start the service. */
  link?: string;
}

/**
 * Return a promise containing a list of estimates for the
 * given start and end points.
 */
export interface EstimateProvider {
  getPriceEstimates(
    start: Location,
    end: Location,
  ): Promise<EstimateResult[]>;
}

/**
 * Create a `PriceRange` where the high and low are equal.
 * @param price The single price point.
 * @return A `PriceRange` object.
 */
export function pricePoint(price: number): PriceRange {
  return {
    high: price,
    low: price,
  };
}
