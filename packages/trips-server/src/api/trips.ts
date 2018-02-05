import * as _ from 'lodash';
import { Location, findAll } from './locations';
import { Estimate } from './estimate';
import lyft from './lyft';
import uber from './uber';
import car2go from './car2go';
import reachnow from './reachnow';

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
    reachnow.getPriceEstimates(start, end),
  ])
  .then(flatten)
  .then(sortEstimates);
}

function flatten <T> (input: Array<T>[]): Array<T> {
  return Array.prototype.concat.apply([], input);
}

function sortEstimates(estimates: Estimate[]): Estimate[] {
  return _.sortBy(estimates, e => e.estimate ? e.estimate.price.low : 99999);
}
