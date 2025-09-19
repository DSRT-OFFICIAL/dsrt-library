import Geometry from './Geometry.js';

export default class BoxGeometry extends Geometry {
  constructor(width = 1, height = 1, depth = 1) {
    super();

    const w = width / 2;
    const h = height / 2;
    const d = depth / 2;

    this.vertices = [
      -w, -h,  d,   w, -h,  d,   w,  h,  d,  -w,  h,  d, // depan
      -w, -h, -d,   w, -h, -d,   w,  h, -d,  -w,  h, -d  // belakang
    ];

    this.indices = [
      0, 1, 2,  2, 3, 0,   // depan
      4, 5, 6,  6, 7, 4,   // belakang
      4, 5, 1,  1, 0, 4,   // bawah
      7, 6, 2,  2, 3, 7,   // atas
      5, 6, 2,  2, 1, 5,   // kanan
      4, 7, 3,  3, 0, 4    // kiri
    ];
  }
}
