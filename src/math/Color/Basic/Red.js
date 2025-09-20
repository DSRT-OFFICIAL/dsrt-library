// Red.js
import Color from '../Color.js';

// Warna dasar Red
const Red = {
  red:         new Color(1.0, 0.0, 0.0),
  darkred:     new Color(0.55, 0.0, 0.0),
  firebrick:   new Color(0.70, 0.13, 0.13),
  crimson:     new Color(0.86, 0.08, 0.24),
  indianred:   new Color(0.80, 0.36, 0.36),
  lightcoral:  new Color(0.94, 0.50, 0.50),
  salmon:      new Color(0.98, 0.50, 0.45),
  darksalmon:  new Color(0.91, 0.59, 0.48),
  lightsalmon: new Color(1.0, 0.63, 0.48),
  tomato:      new Color(1.0, 0.39, 0.28),
};

// Advanced: operasi warna khusus Red (opsional, bisa dipakai fungsi dari Advanced folder)
Red.add = function(c) {
  return new Color(
    this.red.r + c.r,
    this.red.g + c.g,
    this.red.b + c.b
  );
};

Red.lerp = function(c, alpha) {
  return new Color(
    this.red.r + (c.r - this.red.r) * alpha,
    this.red.g + (c.g - this.red.g) * alpha,
    this.red.b + (c.b - this.red.b) * alpha
  );
};

// Professional: konversi
Red.toHex = function(color) {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

Red.toArray = function(color) {
  return [color.r, color.g, color.b];
};

Red.setFromHex = function(hex) {
  const intVal = parseInt(hex.replace('#',''), 16);
  const r = ((intVal >> 16) & 255) / 255;
  const g = ((intVal >> 8) & 255) / 255;
  const b = (intVal & 255) / 255;
  return new Color(r, g, b);
};

export default Red;
