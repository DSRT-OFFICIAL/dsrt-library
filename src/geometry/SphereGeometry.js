import Geometry from './Geometry.js';

export default class SphereGeometry extends Geometry {
  constructor(radius = 1, widthSegments = 16, heightSegments = 12) {
    super();

    const vertices = [];
    const indices = [];

    for (let y = 0; y <= heightSegments; y++) {
      const theta = (y * Math.PI) / heightSegments;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      for (let x = 0; x <= widthSegments; x++) {
        const phi = (x * 2 * Math.PI) / widthSegments;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);

        const vx = radius * cosPhi * sinTheta;
        const vy = radius * cosTheta;
        const vz = radius * sinPhi * sinTheta;

        vertices.push(vx, vy, vz);
      }
    }

    for (let y = 0; y < heightSegments; y++) {
      for (let x = 0; x < widthSegments; x++) {
        const a = y * (widthSegments + 1) + x;
        const b = a + widthSegments + 1;
        const c = b + 1;
        const d = a + 1;

        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    this.vertices = vertices;
    this.indices = indices;
  }
}
