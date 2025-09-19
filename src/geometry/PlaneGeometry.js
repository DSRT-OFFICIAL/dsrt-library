import Geometry from './Geometry.js';

export default class PlaneGeometry extends Geometry {
  constructor(width = 1, height = 1) {
    super();

    const w = width / 2;
    const h = height / 2;

    this.vertices = [
      -w, -h, 0,
       w, -h, 0,
       w,  h, 0,
      -w,  h, 0
    ];

    this.indices = [
      0, 1, 2,
      2, 3, 0
    ];
  }
}
