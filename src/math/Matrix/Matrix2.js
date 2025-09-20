export default class Matrix2 {
  constructor() {
    this.elements = new Float32Array(4);
    this.identity();
  }

  identity() {
    const e = this.elements;
    e[0] = 1; e[1] = 0;
    e[2] = 0; e[3] = 1;
    return this;
  }

  clone() {
    const m = new Matrix2();
    m.elements.set(this.elements);
    return m;
  }

  multiply(matrix) {
    const a = this.elements;
    const b = matrix.elements;
    const te = new Float32Array(4);

    te[0] = a[0]*b[0] + a[2]*b[1];
    te[1] = a[1]*b[0] + a[3]*b[1];
    te[2] = a[0]*b[2] + a[2]*b[3];
    te[3] = a[1]*b[2] + a[3]*b[3];

    this.elements = te;
    return this;
  }
}
