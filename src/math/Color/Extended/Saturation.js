import Color from '../Color.js';

function saturation(c, sat = 1) {
  const avg = (c.r + c.g + c.b) / 3;
  const r = avg + (c.r - avg) * sat;
  const g = avg + (c.g - avg) * sat;
  const b = avg + (c.b - avg) * sat;
  return new Color(r, g, b, c.a);
}

export default saturation;
