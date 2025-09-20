// Import Basic Colors
import * as Basic from './Basic/index.js';

// Import Advanced Operations
import * as Advanced from './Advanced/index.js';

// Import Professional Conversions
import * as Professional from './Professional/index.js';

// Import Extended Formulas / Effects
import * as Extended from './Extended/index.js';

class Color {
  constructor(r = 0, g = 0, b = 0, a = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  // --- Basic Operations ---
  add(c) {
    return Advanced.Add(this, c);
  }

  multiply(c) {
    return Advanced.Multiply(this, c);
  }

  lerp(c, alpha) {
    return Advanced.Lerp(this, c, alpha);
  }

  invert() {
    return Advanced.Invert(this);
  }

  clamp() {
    return Advanced.Clamp(this);
  }

  // --- Professional Conversions ---
  toHex() {
    return Professional.ToHex(this);
  }

  toArray() {
    return Professional.ToArray(this);
  }

  setFromHex(hex) {
    const color = Professional.SetFromHex(hex);
    this.r = color.r;
    this.g = color.g;
    this.b = color.b;
    this.a = color.a;
    return this;
  }

  setFromArray(arr) {
    const color = Professional.SetFromArray(arr);
    this.r = color.r;
    this.g = color.g;
    this.b = color.b;
    this.a = color.a;
    return this;
  }

  // --- Extended Effects ---
  mix(c, alpha = 0.5) {
    return Extended.Mix(this, c, alpha);
  }

  pastel() {
    return Extended.Pastel(this);
  }

  neon() {
    return Extended.Neon(this);
  }

  saturation(factor) {
    return Extended.Saturation(this, factor);
  }

  brightness(factor) {
    return Extended.Brightness(this, factor);
  }
}

// --- Export Master ---
export {
  Color,
  Basic,
  Advanced,
  Professional,
  Extended
};
