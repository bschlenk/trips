import { Location } from './locations';
import { Estimate, EstimateProvider } from './estimate';
import Service from './service';
import { computeDistance } from './distance';

export interface PriceStructure {
  /** The price per minute. */
  minute: number
  /** The price per hour. */
  hour: number
  /** The price per day. */
  day: number
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
  DURATIONS.forEach(([value, name]) => {
    while (duration > value) {
      const price = prices[name];
      cost += price;
      duration -= value;
    }
  });
  if (duration) {
    cost += prices.minute;
  }
  return cost;
}
