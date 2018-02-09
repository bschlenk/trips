import { computeDistance } from './distance';
import { Estimate, EstimateProvider } from './estimate';
import { Location } from './locations';
import Service from './service';

export interface PriceStructure {
  /** The price per minute. */
  minute: number;
  /** The price per hour. */
  hour: number;
  /** The price per day. */
  day: number;
}

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

type Duration = keyof PriceStructure;
type DurationIndex = [number, Duration];

const DURATIONS: DurationIndex[] = [
  [DAY, 'day'],
  [HOUR, 'hour'],
  [MINUTE, 'minute'],
];

export function calculateCost(duration: number, prices: PriceStructure): number {
  let cost = 0;
  let remaining = duration;
  DURATIONS.forEach(([value, name]) => {
    while (remaining > value) {
      const price = prices[name];
      cost += price;
      remaining -= value;
    }
  });
  if (remaining > 0) {
    cost += prices.minute;
  }
  return cost;
}
