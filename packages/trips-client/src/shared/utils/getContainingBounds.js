import getBounds from './getBounds';

/**
 * Get a bounds containing all the given points.
 * @param {{ lat: number, lng: number }[]} coords Each location to fit within
 *     the bounds.
 * @return {object}
 */
export default function getContainingBounds(points) {
  if (points.length === 1) {
    return getBounds(points[0], 200);
  }

  const bounds = new window.google.maps.LatLngBounds();
  for (const point of points) {
    bounds.extend(point);
  }
  return bounds;
}
