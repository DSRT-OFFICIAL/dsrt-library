import Color from '../Color.js';

function multiply(c1, c2) {
  return new Color(
    c1.r * c2.r,
    c1.g * c2.g,
    c1.b * c2.b
  );
}

export default multiply;
