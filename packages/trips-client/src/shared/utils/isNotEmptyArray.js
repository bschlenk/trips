/**
 * Check that the given value is an array with at least one element.
 * @param {any} val The value to check.
 * @return {boolean}
 */
export default function isNotEmptyArray(val) {
  return Array.isArray(val) && val.length > 0;
}
