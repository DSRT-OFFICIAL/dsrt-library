export default class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  clone() {
    return new Vector2(this.x, this.y);
  }

  copy(v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  addScalar(s) {
    this.x += s;
    this.y += s;
    return this;
  }

  subtract(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  multiply(v) {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }

  multiplyScalar(s) {
    this.x *= s;
    this.y *= s;
    return this;
  }

  divide(v) {
    this.x /= v.x;
    this.y /= v.y;
    return this;
  }

  divideScalar(s) {
    return this.multiplyScalar(1 / s);
  }

  length() {
    return Math.sqrt(this.x*this.x + this.y*this.y);
  }

  lengthSq() {
    return this.x*this.x + this.y*this.y;
  }

  normalize() {
    const len = this.length();
    return len > 0 ? this.divideScalar(len) : this;
  }

  dot(v) {
    return this.x*v.x + this.y*v.y;
  }

  cross(v) {
    return this.x*v.y - this.y*v.x;
  }

  distanceTo(v) {
    return Math.sqrt(this.distanceToSquared(v));
  }

  distanceToSquared(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return dx*dx + dy*dy;
  }

  // ===============================
  // Linear interpolation
  // ===============================
  lerp(v, t) {
    this.x += (v.x - this.x) * t;
    this.y += (v.y - this.y) * t;
    return this;
  }

  angle() {
    return Math.atan2(this.y, this.x);
  }

  rotateAround(center, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);

    const x = this.x - center.x;
    const y = this.y - center.y;

    this.x = x * c - y * s + center.x;
    this.y = x * s + y * c + center.y;

    return this;
  }
}
