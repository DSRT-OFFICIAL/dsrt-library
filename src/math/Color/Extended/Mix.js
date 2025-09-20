import Color from '../Color.js';

function mix(c1, c2, alpha = 0.5) {
  const r = c1.r * (1 - alpha) + c2.r * alpha;
  const g = c1.g * (1 - alpha) + c2.g * alpha;
  const b = c1.b * (1 - alpha) + c2.b * alpha;
  const a = (c1.a !== undefined && c2.a !== undefined) ? c1.a * (1 - alpha) + c2.a * alpha : undefined;
  return new Color(r, g, b, a);
}

export default mix;
