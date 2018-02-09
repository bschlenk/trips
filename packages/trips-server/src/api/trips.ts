import * as _ from 'lodash';
import car2go from './car2go';
import { EstimateResult } from './estimate';
import { findAll, Location } from './locations';
import lyft from './lyft';
import reachnow from './reachnow';
import uber from './uber';

export function getPriceEstimatesByAddress(
    startAddress: string, endAddress: string): Promise<EstimateResult[]> {
  return findAll(startAddress, endAddress).then(([start, end]) => {
    return getPriceEstimates(start, end);
  });
}

export function getPriceEstimates(
    start: Location, end: Location): Promise<EstimateResult[]> {
  return Promise.all([
    lyft.getPriceEstimates(start, end),
    uber.getPriceEstimates(start, end),
    car2go.getPriceEstimates(start, end),
    reachnow.getPriceEstimates(start, end),
  ])
  .then(flatten)
  .then(sortEstimates);
}

function flatten <T>(input: T[][]): T[] {
  return Array.prototype.concat.apply([], input);
}

function sortEstimates(estimates: EstimateResult[]): EstimateResult[] {
  return _.sortBy(estimates, e => e.estimate ? e.estimate.price.low : 99999);
}
