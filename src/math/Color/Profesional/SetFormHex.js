import Color from '../Color.js';

function setFromHex(hex) {
  if(hex.startsWith('#')) hex = hex.slice(1);
  const bigint = parseInt(hex, 16);
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255;
  const b = (bigint & 255) / 255;
  return new Color(r, g, b);
}

export default setFromHex;
