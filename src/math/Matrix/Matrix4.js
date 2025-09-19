export default class Matrix4 {
  constructor() {
    this.elements = new Float32Array(16);
    this.identity();
  }

  identity() {
    const e = this.elements;
    e[0]=1;e[4]=0;e[8]=0;e[12]=0;
    e[1]=0;e[5]=1;e[9]=0;e[13]=0;
    e[2]=0;e[6]=0;e[10]=1;e[14]=0;
    e[3]=0;e[7]=0;e[11]=0;e[15]=1;
    return this;
  }

  clone() {
    const m = new Matrix4();
    m.elements.set(this.elements);
    return m;
  }

  copy(matrix) {
    this.elements.set(matrix.elements);
    return this;
  }

  multiply(matrix) {
    const ae = this.elements;
    const be = matrix.elements;
    const te = new Float32Array(16);

    for (let row=0; row<4; row++) {
      for (let col=0; col<4; col++) {
        te[row + col*4] = 
          ae[row]*be[col*4] +
          ae[row+4]*be[col*4+1] +
          ae[row+8]*be[col*4+2] +
          ae[row+12]*be[col*4+3];
      }
    }

    this.elements = te;
    return this;
  }

  transpose() {
    const e = this.elements;
    let tmp;
    tmp = e[1]; e[1] = e[4]; e[4] = tmp;
    tmp = e[2]; e[2] = e[8]; e[8] = tmp;
    tmp = e[3]; e[3] = e[12]; e[12] = tmp;
    tmp = e[6]; e[6] = e[9]; e[9] = tmp;
    tmp = e[7]; e[7] = e[13]; e[13] = tmp;
    tmp = e[11]; e[11] = e[14]; e[14] = tmp;
    return this;
  }

  invert() {
    const m = this.elements;
    const inv = new Float32Array(16);

    inv[0] = m[5]*m[10]*m[15] - m[5]*m[11]*m[14] -
             m[9]*m[6]*m[15] + m[9]*m[7]*m[14] +
             m[13]*m[6]*m[11] - m[13]*m[7]*m[10];

    inv[4] = -m[4]*m[10]*m[15] + m[4]*m[11]*m[14] +
              m[8]*m[6]*m[15] - m[8]*m[7]*m[14] -
              m[12]*m[6]*m[11] + m[12]*m[7]*m[10];

    inv[8] = m[4]*m[9]*m[15] - m[4]*m[11]*m[13] -
             m[8]*m[5]*m[15] + m[8]*m[7]*m[13] +
             m[12]*m[5]*m[11] - m[12]*m[7]*m[9];

    inv[12] = -m[4]*m[9]*m[14] + m[4]*m[10]*m[13] +
               m[8]*m[5]*m[14] - m[8]*m[6]*m[13] -
               m[12]*m[5]*m[10] + m[12]*m[6]*m[9];

    inv[1] = -m[1]*m[10]*m[15] + m[1]*m[11]*m[14] +
              m[9]*m[2]*m[15] - m[9]*m[3]*m[14] -
              m[13]*m[2]*m[11] + m[13]*m[3]*m[10];

    inv[5] = m[0]*m[10]*m[15] - m[0]*m[11]*m[14] -
             m[8]*m[2]*m[15] + m[8]*m[3]*m[14] +
             m[12]*m[2]*m[11] - m[12]*m[3]*m[10];

    inv[9] = -m[0]*m[9]*m[15] + m[0]*m[11]*m[13] +
              m[8]*m[1]*m[15] - m[8]*m[3]*m[13] -
              m[12]*m[1]*m[11] + m[12]*m[3]*m[9];

    inv[13] = m[0]*m[9]*m[14] - m[0]*m[10]*m[13] -
              m[8]*m[1]*m[14] + m[8]*m[2]*m[13] +
              m[12]*m[1]*m[10] - m[12]*m[2]*m[9];

    inv[2] = m[1]*m[6]*m[15] - m[1]*m[7]*m[14] -
             m[5]*m[2]*m[15] + m[5]*m[3]*m[14] +
             m[13]*m[2]*m[7] - m[13]*m[3]*m[6];

    inv[6] = -m[0]*m[6]*m[15] + m[0]*m[7]*m[14] +
              m[4]*m[2]*m[15] - m[4]*m[3]*m[14] -
              m[12]*m[2]*m[7] + m[12]*m[3]*m[6];

    inv[10] = m[0]*m[5]*m[15] - m[0]*m[7]*m[13] -
              m[4]*m[1]*m[15] + m[4]*m[3]*m[13] +
              m[12]*m[1]*m[7] - m[12]*m[3]*m[5];

    inv[14] = -m[0]*m[5]*m[14] + m[0]*m[6]*m[13] +
               m[4]*m[1]*m[14] - m[4]*m[2]*m[13] -
               m[12]*m[1]*m[6] + m[12]*m[2]*m[5];

    inv[3] = -m[1]*m[6]*m[11] + m[1]*m[7]*m[10] +
              m[5]*m[2]*m[11] - m[5]*m[3]*m[10] -
              m[9]*m[2]*m[7] + m[9]*m[3]*m[6];

    inv[7] = m[0]*m[6]*m[11] - m[0]*m[7]*m[10] -
             m[4]*m[2]*m[11] + m[4]*m[3]*m[10] +
             m[8]*m[2]*m[7] - m[8]*m[3]*m[6];

    inv[11] = -m[0]*m[5]*m[11] + m[0]*m[7]*m[9] +
               m[4]*m[1]*m[11] - m[4]*m[3]*m[9] -
               m[8]*m[1]*m[7] + m[8]*m[3]*m[5];

    inv[15] = m[0]*m[5]*m[10] - m[0]*m[6]*m[9] -
              m[4]*m[1]*m[10] + m[4]*m[2]*m[9] +
              m[8]*m[1]*m[6] - m[8]*m[2]*m[5];

    let det = m[0]*inv[0] + m[1]*inv[4] + m[2]*inv[8] + m[3]*inv[12];
    if (det === 0) return this.identity();

    det = 1.0 / det;
    for (let i=0;i<16;i++) inv[i] *= det;

    this.elements = inv;
    return this;
  }

  makeTranslation(x, y, z) {
    this.identity();
    this.elements[12] = x;
    this.elements[13] = y;
    this.elements[14] = z;
    return this;
  }

  makeRotationX(theta) {
    const c = Math.cos(theta), s = Math.sin(theta);
    this.identity();
    this.elements[5] = c;
    this.elements[6] = s;
    this.elements[9] = -s;
    this.elements[10] = c;
    return this;
  }

  makeRotationY(theta) {
    const c = Math.cos(theta), s = Math.sin(theta);
    this.identity();
    this.elements[0] = c;
    this.elements[2] = -s;
    this.elements[8] = s;
    this.elements[10] = c;
    return this;
  }

  makeRotationZ(theta) {
    const c = Math.cos(theta), s = Math.sin(theta);
    this.identity();
    this.elements[0] = c;
    this.elements[1] = s;
    this.elements[4] = -s;
    this.elements[5] = c;
    return this;
  }

  makeScale(x, y, z) {
    this.identity();
    this.elements[0] = x;
    this.elements[5] = y;
    this.elements[10] = z;
    return this;
  }

  makePerspective(fov, aspect, near, far) {
    const tan = Math.tan((fov / 2) * (Math.PI / 180));
    const e = this.elements;
    const rangeInv = 1 / (near - far);

    e[0] = 1 / (tan * aspect); e[4] = 0;       e[8] = 0;                        e[12] = 0;
    e[1] = 0;                 e[5] = 1 / tan; e[9] = 0;                        e[13] = 0;
    e[2] = 0;                 e[6] = 0;       e[10] = (near + far) * rangeInv; e[14] = 2 * near * far * rangeInv;
    e[3] = 0;                 e[7] = 0;       e[11] = -1;                       e[15] = 0;

    return this;
  }

  makeOrthographic(left, right, top, bottom, near, far) {
    const e = this.elements;
    const w = 1 / (right - left);
    const h = 1 / (top - bottom);
    const p = 1 / (far - near);

    e[0] = 2 * w; e[4] = 0;     e[8] = 0;        e[12] = -(right + left) * w;
    e[1] = 0;     e[5] = 2 * h; e[9] = 0;        e[13] = -(top + bottom) * h;
    e[2] = 0;     e[6] = 0;     e[10] = -2 * p;  e[14] = -(far + near) * p;
    e[3] = 0;     e[7] = 0;     e[11] = 0;       e[15] = 1;

    return this;
  }
}
