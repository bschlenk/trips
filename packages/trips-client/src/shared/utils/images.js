/**
 * Create a new image element from the given url.
 * @param {string} src The image url to load.
 * @return {HTMLImageElement}
 */
export function createImage(src) {
  const img = new Image();
  img.src = src;
  return img;
}
