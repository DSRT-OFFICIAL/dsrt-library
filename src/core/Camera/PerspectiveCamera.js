import Camera from './Camera.js';
import { Matrix4 } from '../../math/Matrix/Matrix4.js';

export default class PerspectiveCamera extends Camera {
  constructor(fov = 75, aspect = 1, near = 0.1, far = 1000) {
    super();
    this.fov = fov;
    this.aspect = aspect;
    this.near = near;
    this.far = far;

    this.updateProjectionMatrix();
  }

  updateProjectionMatrix() {
    const top = this.near * Math.tan((this.fov * Math.PI) / 360);
    const height = 2 * top;
    const width = this.aspect * height;
    const left = -0.5 * width;
    const right = left + width;
    const bottom = top - height;

    this.projectionMatrix = new Matrix4().makePerspective(left, right, top, bottom, this.near, this.far);
  }
}
