import * as NodeGeocoder from 'node-geocoder';

export interface Location {
  latitude: number;
  longitude: number;
}

const geocoder = NodeGeocoder({
  provider: 'google',
});

/**
 * Find the latitude/longitude of the given address.
 * @param {string} query
 * @returns {Promise<Location>} A promise containing the location.
 */
export function find(query: string): Promise<Location> {
  return geocoder.geocode(query).then(res => {
    return res[0];
  });
}

/**
 * Find the location of all the given queries.
 * @param {...string} queries Variadic list of queries.
 * @returns {Promise<Array<Location>>} A promise containing the
 *     resolved locations, in the requested order.
 */
export function findAll(...queries: string[]): Promise<Location[]> {
  return geocoder.batchGeocode(queries).then(res => {
    return res.map(loc => {
      if (loc.error) {
        throw loc.error;
      }
      return loc.value[0];
    });
  });
}
