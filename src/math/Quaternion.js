export default class Quaternion {
  constructor(x = 0, y = 0, z = 0, w = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  // ===============================
  // Basic setters & cloning
  // ===============================
  set(x, y, z, w) {
    this.x = x; this.y = y; this.z = z; this.w = w;
    return this;
  }

  clone() {
    return new Quaternion(this.x, this.y, this.z, this.w);
  }

  copy(q) {
    this.x = q.x; this.y = q.y; this.z = q.z; this.w = q.w;
    return this;
  }

  // ===============================
  // Identity / static constructors
  // ===============================
  static identity() {
    return new Quaternion(0, 0, 0, 1);
  }

  static fromAxisAngle(axis, angle) {
    const q = new Quaternion();
    return q.setFromAxisAngle(axis, angle);
  }

  static fromEuler(euler) {
    const q = new Quaternion();
    return q.setFromEuler(euler);
  }

  // ===============================
  // Length & normalization
  // ===============================
  length() {
    return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z + this.w*this.w);
  }

  normalize() {
    const l = this.length();
    if (l === 0) return this.set(0, 0, 0, 1);
    const invL = 1 / l;
    this.x *= invL; this.y *= invL; this.z *= invL; this.w *= invL;
    return this;
  }

  // ===============================
  // Quaternion operations
  // ===============================
  multiply(q) {
    const x = this.x, y = this.y, z = this.z, w = this.w;
    const qx = q.x, qy = q.y, qz = q.z, qw = q.w;

    this.x = w*qx + x*qw + y*qz - z*qy;
    this.y = w*qy - x*qz + y*qw + z*qx;
    this.z = w*qz + x*qy - y*qx + z*qw;
    this.w = w*qw - x*qx - y*qy - z*qz;

    return this;
  }

  multiplyQuaternions(a, b) {
    const qax = a.x, qay = a.y, qaz = a.z, qaw = a.w;
    const qbx = b.x, qby = b.y, qbz = b.z, qbw = b.w;

    this.x = qaw*qbx + qax*qbw + qay*qbz - qaz*qby;
    this.y = qaw*qby - qax*qbz + qay*qbw + qaz*qbx;
    this.z = qaw*qbz + qax*qby - qay*qbx + qaz*qbw;
    this.w = qaw*qbw - qax*qbx - qay*qby - qaz*qbz;

    return this;
  }

  invert() {
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;
    return this.normalize();
  }

  conjugate() {
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;
    return this;
  }

  // ===============================
  // Set from Axis-Angle / Euler
  // ===============================
  setFromAxisAngle(axis, angle) {
    const half = angle / 2;
    const s = Math.sin(half);
    this.x = axis.x * s;
    this.y = axis.y * s;
    this.z = axis.z * s;
    this.w = Math.cos(half);
    return this;
  }

  setFromEuler(euler) {
    const c1 = Math.cos(euler.x / 2), c2 = Math.cos(euler.y / 2), c3 = Math.cos(euler.z / 2);
    const s1 = Math.sin(euler.x / 2), s2 = Math.sin(euler.y / 2), s3 = Math.sin(euler.z / 2);

    this.x = s1*c2*c3 + c1*s2*s3;
    this.y = c1*s2*c3 - s1*c2*s3;
    this.z = c1*c2*s3 + s1*s2*c3;
    this.w = c1*c2*c3 - s1*s2*s3;

    return this;
  }

  // ===============================
  // Slerp
  // ===============================
  slerp(q, t) {
    let cosHalfTheta = this.x*q.x + this.y*q.y + this.z*q.z + this.w*q.w;

    let q1 = q;
    if (cosHalfTheta < 0) {
      q1 = new Quaternion(-q.x, -q.y, -q.z, -q.w);
      cosHalfTheta = -cosHalfTheta;
    }

    if (cosHalfTheta >= 1.0) return this;

    const halfTheta = Math.acos(cosHalfTheta);
    const sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta*cosHalfTheta);

    if (Math.abs(sinHalfTheta) < 0.001) {
      this.x = 0.5*(this.x + q1.x);
      this.y = 0.5*(this.y + q1.y);
      this.z = 0.5*(this.z + q1.z);
      this.w = 0.5*(this.w + q1.w);
      return this;
    }

    const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
    const ratioB = Math.sin(t * halfTheta) / sinHalfTheta;

    this.x = this.x * ratioA + q1.x * ratioB;
    this.y = this.y * ratioA + q1.y * ratioB;
    this.z = this.z * ratioA + q1.z * ratioB;
    this.w = this.w * ratioA + q1.w * ratioB;

    return this;
  }

  // ===============================
  // Angle to another quaternion
  // ===============================
  angleTo(q) {
    const dot = this.x*q.x + this.y*q.y + this.z*q.z + this.w*q.w;
    return 2 * Math.acos(Math.min(Math.abs(dot), 1));
  }

  // ===============================
  // Convert to Matrix4
  // ===============================
  toMatrix4() {
    const x = this.x, y = this.y, z = this.z, w = this.w;
    const e = new Float32Array(16);

    const x2 = x + x, y2 = y + y, z2 = z + z;
    const xx = x*x2, xy = x*y2, xz = x*z2;
    const yy = y*y2, yz = y*z2, zz = z*z2;
    const wx = w*x2, wy = w*y2, wz = w*z2;

    e[0] = 1 - (yy + zz); e[4] = xy - wz;     e[8]  = xz + wy;   e[12] = 0;
    e[1] = xy + wz;       e[5] = 1 - (xx + zz); e[9]  = yz - wx;   e[13] = 0;
    e[2] = xz - wy;       e[6] = yz + wx;     e[10] = 1 - (xx + yy); e[14] = 0;
    e[3] = 0;             e[7] = 0;           e[11] = 0;          e[15] = 1;

    return e;
  }
}
