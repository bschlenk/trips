import { Location, findAll } from './locations';
import { Estimate } from './estimate';
import lyft from './lyft';
import uber from './uber';
import car2go from './car2go';

export function getPriceEstimatesByAddress(
    start: string, end: string): Promise<Estimate[]> {
  return findAll(start, end).then(([start, end]) => {
    return getPriceEstimates(start, end);
  });
}

export function getPriceEstimates(
    start: Location, end: Location): Promise<Estimate[]> {
  return Promise.all([
    lyft.getPriceEstimates(start, end),
    uber.getPriceEstimates(start, end),
    car2go.getPriceEstimates(start, end),
  ]).then(results => {
    // concatenate all results into a single array
    return [].concat.apply([], results);
  });
}
