import Light from './Light.js';
import { Vector3 } from '../../math/Vector/Vector3.js';

export default class DirectionalLight extends Light {
  constructor(color = '#ffffff', intensity = 1.0, direction = new Vector3(0, -1, 0)) {
    super(color, intensity);
    this.type = 'DirectionalLight';
    this.direction = direction;
  }

  setDirection(x, y, z) {
    this.direction.set(x, y, z);
    return this;
  }
}
