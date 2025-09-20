import Color from '../Color.js';

function setFromArray(arr) {
  const [r, g, b, a] = arr;
  return new Color(r, g, b, a);
}

export default setFromArray;
