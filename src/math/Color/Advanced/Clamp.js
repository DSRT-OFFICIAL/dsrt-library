import Color from '../Color.js';

function clamp(c) {
  return new Color(
    Math.min(Math.max(c.r, 0), 1),
    Math.min(Math.max(c.g, 0), 1),
    Math.min(Math.max(c.b, 0), 1)
  );
}

export default clamp;
