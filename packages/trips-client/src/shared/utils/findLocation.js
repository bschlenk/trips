/**
 * Find the user's current location, if supported
 * by the browser.
 * @return {Promise<{lat: number, lng: number}>} The lat/lng coords.
 */
export default function findLocation() {
  // Try HTML5 geolocation.
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error(`Browser doesn't support geolocation`));
      return;
    }

    function success(position) {
      resolve({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    }

    function error(err) {
      reject(new Error(`Geolocation service failed: ${err.message}`));
    }

    const options = {
      enableHighAccuracy: true,
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  });
}
