export default class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  // Set, clone, copy
  set(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  clone() {
    return new Vector3(this.x, this.y, this.z);
  }

  copy(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }

  // Basic arithmetic
  add(v) { this.x+=v.x; this.y+=v.y; this.z+=v.z; return this; }
  addScalar(s) { this.x+=s; this.y+=s; this.z+=s; return this; }
  subtract(v) { this.x-=v.x; this.y-=v.y; this.z-=v.z; return this; }
  multiply(v) { this.x*=v.x; this.y*=v.y; this.z*=v.z; return this; }
  multiplyScalar(s) { this.x*=s; this.y*=s; this.z*=s; return this; }
  divide(v) { this.x/=v.x; this.y/=v.y; this.z/=v.z; return this; }
  divideScalar(s) { return this.multiplyScalar(1/s); }

  // Length & normalize
  length() { return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z); }
  lengthSq() { return this.x*this.x + this.y*this.y + this.z*this.z; }
  normalize() { const l = this.length(); return l>0 ? this.divideScalar(l) : this; }

  // Dot, cross, distance
  dot(v) { return this.x*v.x + this.y*v.y + this.z*v.z; }
  cross(v) {
    const x = this.y*v.z - this.z*v.y;
    const y = this.z*v.x - this.x*v.z;
    const z = this.x*v.y - this.y*v.x;
    this.x = x; this.y = y; this.z = z;
    return this;
  }
  distanceTo(v) { return Math.sqrt(this.distanceToSquared(v)); }
  distanceToSquared(v) { const dx=this.x-v.x, dy=this.y-v.y, dz=this.z-v.z; return dx*dx+dy*dy+dz*dz; }

  // Lerp
  lerp(v, t) { this.x+=(v.x-this.x)*t; this.y+=(v.y-this.y)*t; this.z+=(v.z-this.z)*t; return this; }

  // Apply Matrix4
  applyMatrix4(m) {
    const e = m.elements;
    const x = this.x, y = this.y, z = this.z;
    const w = 1 / (e[3]*x + e[7]*y + e[11]*z + e[15]);
    this.x = (e[0]*x + e[4]*y + e[8]*z + e[12]) * w;
    this.y = (e[1]*x + e[5]*y + e[9]*z + e[13]) * w;
    this.z = (e[2]*x + e[6]*y + e[10]*z + e[14]) * w;
    return this;
  }
}
