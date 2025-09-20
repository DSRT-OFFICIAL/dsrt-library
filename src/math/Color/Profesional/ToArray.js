import Color from '../Color.js';

function toArray(c, includeAlpha = false) {
  if(includeAlpha && c.a !== undefined) {
    return [c.r, c.g, c.b, c.a];
  }
  return [c.r, c.g, c.b];
}

export default toArray;
