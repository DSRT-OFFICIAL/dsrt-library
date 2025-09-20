import Color from '../Color.js';

function invert(c) {
  return new Color(
    1 - c.r,
    1 - c.g,
    1 - c.b
  );
}

export default invert;
