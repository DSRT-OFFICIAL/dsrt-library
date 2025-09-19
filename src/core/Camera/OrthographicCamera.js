import Camera from './Camera.js';
import { Matrix4 } from '../../math/Matrix/Matrix4.js';

export default class OrthographicCamera extends Camera {
  constructor(left = -1, right = 1, top = 1, bottom = -1, near = 0.1, far = 2000) {
    super();
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
    this.near = near;
    this.far = far;

    this.updateProjectionMatrix();
  }

  updateProjectionMatrix() {
    this.projectionMatrix = new Matrix4().makeOrthographic(
      this.left,
      this.right,
      this.top,
      this.bottom,
      this.near,
      this.far
    );
  }
}
