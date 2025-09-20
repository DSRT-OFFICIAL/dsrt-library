import Color from '../Color.js';

function pastel(c) {
  const r = (c.r + 1) / 2;
  const g = (c.g + 1) / 2;
  const b = (c.b + 1) / 2;
  return new Color(r, g, b, c.a);
}

export default pastel;
