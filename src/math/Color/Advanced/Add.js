import Color from '../Color.js';

function add(c1, c2) {
  return new Color(
    Math.min(c1.r + c2.r, 1),
    Math.min(c1.g + c2.g, 1),
    Math.min(c1.b + c2.b, 1)
  );
}

export default add;
