/**
 * Find the user's current location, if supported
 * by the browser.
 * @return {Promise<{lat: number, lng: number}>} The lat/lng coords.
 */
export function findLocation() {
  // Try HTML5 geolocation.
  return new Promise((res, rej) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        res(pos);
      }, () => {
        rej("Geolocation service failed");
      });
    } else {
      // Browser doesn't support Geolocation
      rej("Browser doesn't support geolocation");
    }
  });
}
