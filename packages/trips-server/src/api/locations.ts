import * as NodeGeocoder from 'node-geocoder';
import { lruCache } from './lru';

export interface Location {
  latitude: number;
  longitude: number;
}

/** Either a lat/lng pair or a string address. */
export type LocationInput = string | Location;

const geocoder = NodeGeocoder({
  provider: 'google',
});

/**
 * Find the latitude/longitude of the given address.
 * @param {string} query
 * @returns {Promise<Location>} A promise containing the location.
 */
export async function find(query: LocationInput): Promise<Location> {
  if (typeof query === 'string') {
    const res = await geocoder.geocode(query);
    return entryToLocation(res[0]);
  }
  return query;
}

/**
 * Find the location of all the given queries.
 * @param {...string} queries Variadic list of queries.
 * @returns {Promise<Location[]>} A promise containing the
 *     resolved locations, in the requested order.
 */
const findAll = lruCache(
  50,
  async (...queries: LocationInput[]): Promise<Location[]> => {
    const addresses: string[] = queries.filter(
      location => typeof location === 'string',
    ) as string[];

    const res = await geocoder.batchGeocode(addresses);
    const locations = res.map((loc) => {
      if (loc.error) {
        throw loc.error;
      }
      return entryToLocation(loc.value[0]);
    });

    const result: Location[] = [];

    let i = 0;
    queries.forEach((val, index) => {
      if (typeof val === 'string') {
        result[index] = locations[i];
        ++i;
      } else {
        result[index] = val;
      }
    });

    return result;
  });

export { findAll };

function entryToLocation(entry: NodeGeocoder.Entry): Location {
  const { latitude, longitude } = entry;
  if (latitude == null || longitude == null) {
    throw new Error('expected latitude and longitude from geocoder');
  }
  return { latitude, longitude };
}
