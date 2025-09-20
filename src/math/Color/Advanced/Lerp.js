import Color from '../Color.js';

function lerp(c1, c2, alpha) {
  return new Color(
    c1.r + (c2.r - c1.r) * alpha,
    c1.g + (c2.g - c1.g) * alpha,
    c1.b + (c2.b - c1.b) * alpha
  );
}

export default lerp;
