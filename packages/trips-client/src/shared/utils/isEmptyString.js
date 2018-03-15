/**
 * Check if the given string is null, undefined, empty, or only whitespace.
 * @param {string} str
 * @return {boolean}
 */
export default function isEmptyString(str) {
  return !str || /^\s*$/.test(str);
}
