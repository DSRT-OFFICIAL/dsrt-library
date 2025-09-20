export default class Matrix4 {
  constructor() {
    this.elements = new Float32Array(16);
    this.identity();
  }

  identity() {
    const e = this.elements;
    e[0]=1;e[1]=0;e[2]=0;e[3]=0;
    e[4]=0;e[5]=1;e[6]=0;e[7]=0;
    e[8]=0;e[9]=0;e[10]=1;e[11]=0;
    e[12]=0;e[13]=0;e[14]=0;e[15]=1;
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
    const a = this.elements;
    const b = matrix.elements;
    const te = new Float32Array(16);

    for (let row=0; row<4; row++) {
      for (let col=0; col<4; col++) {
        te[row + col*4] =
          a[row]*b[col*4] +
          a[row+4]*b[col*4+1] +
          a[row+8]*b[col*4+2] +
          a[row+12]*b[col*4+3];
      }
    }

    this.elements = te;
    return this;
  }

  transpose() {
    const e = this.elements;
    let tmp;
    tmp = e[1]; e[1]=e[4]; e[4]=tmp;
    tmp = e[2]; e[2]=e[8]; e[8]=tmp;
    tmp = e[3]; e[3]=e[12]; e[12]=tmp;
    tmp = e[6]; e[6]=e[9]; e[9]=tmp;
    tmp = e[7]; e[7]=e[13]; e[13]=tmp;
    tmp = e[11]; e[11]=e[14]; e[14]=tmp;
    return this;
  }

  // Translation, Rotation, Scale
  makeTranslation(x,y,z) { this.identity(); this.elements[12]=x; this.elements[13]=y; this.elements[14]=z; return this; }
  makeScale(x,y,z) { this.identity(); this.elements[0]=x; this.elements[5]=y; this.elements[10]=z; return this; }
  makeRotationX(theta) { const c=Math.cos(theta),s=Math.sin(theta); this.identity(); this.elements[5]=c; this.elements[6]=s; this.elements[9]=-s; this.elements[10]=c; return this; }
  makeRotationY(theta) { const c=Math.cos(theta),s=Math.sin(theta); this.identity(); this.elements[0]=c; this.elements[2]=-s; this.elements[8]=s; this.elements[10]=c; return this; }
  makeRotationZ(theta) { const c=Math.cos(theta),s=Math.sin(theta); this.identity(); this.elements[0]=c; this.elements[1]=s; this.elements[4]=-s; this.elements[5]=c; return this; }

  // Perspective / Orthographic
  makePerspective(fov, aspect, near, far) {
    const tan = Math.tan(fov/2 * Math.PI/180);
    const e = this.elements;
    const rangeInv = 1 / (near - far);

    e[0]=1/(tan*aspect); e[1]=0; e[2]=0; e[3]=0;
    e[4]=0; e[5]=1/tan; e[6]=0; e[7]=0;
    e[8]=0; e[9]=0; e[10]=(near+far)*rangeInv; e[11]=-1;
    e[12]=0; e[13]=0; e[14]=2*near*far*rangeInv; e[15]=0;

    return this;
  }

  makeOrthographic(left,right,top,bottom,near,far) {
    const e = this.elements;
    const w = 1/(right-left);
    const h = 1/(top-bottom);
    const p = 1/(far-near);

    e[0]=2*w; e[1]=0; e[2]=0; e[3]=0;
    e[4]=0; e[5]=2*h; e[6]=0; e[7]=0;
    e[8]=0; e[9]=0; e[10]=-2*p; e[11]=0;
    e[12]=-(right+left)*w; e[13]=-(top+bottom)*h; e[14]=-(far+near)*p; e[15]=1;

    return this;
  }
}
