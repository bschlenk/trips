const GEOCODER = new window.google.maps.Geocoder();

/**
 * Takes in a LatLng object and returns a promise of the
 * address at that location.
 * @param {{ lat: number, lng: number }} coords
 * @return {Promise<any>}
 */
export default function geocodeLocation(coords) {
  return new Promise((resolve, reject) => {
    GEOCODER.geocode({ latLng: coords }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        resolve(results[0].formatted_address);
      } else {
        reject(status, results);
      }
    });
  });
}
