export default class Matrix3 {
  constructor() {
    this.elements = new Float32Array(9);
    this.identity();
  }

  identity() {
    const e = this.elements;
    e[0]=1; e[1]=0; e[2]=0;
    e[3]=0; e[4]=1; e[5]=0;
    e[6]=0; e[7]=0; e[8]=1;
    return this;
  }

  clone() {
    const m = new Matrix3();
    m.elements.set(this.elements);
    return m;
  }

  multiply(matrix) {
    const a = this.elements;
    const b = matrix.elements;
    const te = new Float32Array(9);

    for (let row=0; row<3; row++) {
      for (let col=0; col<3; col++) {
        te[row + col*3] = a[row]*b[col*3] + a[row+3]*b[col*3+1] + a[row+6]*b[col*3+2];
      }
    }

    this.elements = te;
    return this;
  }
}
