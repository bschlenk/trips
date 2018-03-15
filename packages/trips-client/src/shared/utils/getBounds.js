/**
 * Get the bounds from the center of a cirlce and its radius.
 *
 * @param {{ lat: number, lng: number }} coords The coordindates of the center
 *     of the circle.
 * @param {number?} radius The radius of the circle containing the bounds.
 * @return A google maps bounds object.
 */
export default function getBounds(coords, radius = 3000) {
  const { lat, lng } = coords;
  const center = new window.google.maps.LatLng(lat, lng);
  const circle = new window.google.maps.Circle({ radius, center });
  return circle.getBounds();
}
