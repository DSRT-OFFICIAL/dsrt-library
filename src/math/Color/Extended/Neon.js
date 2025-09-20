import Color from '../Color.js';

function neon(c) {
  const factor = 1.5;
  const r = Math.min(c.r * factor, 1);
  const g = Math.min(c.g * factor, 1);
  const b = Math.min(c.b * factor, 1);
  return new Color(r, g, b, c.a);
}

export default neon;
