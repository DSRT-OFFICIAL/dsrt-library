import Light from './Light.js';
import { Vector3 } from '../../math/Vector/Vector3.js';

export default class SpotLight extends Light {
  constructor(
    color = '#ffffff',
    intensity = 1.0,
    angle = Math.PI / 3,
    penumbra = 0,
    decay = 1,
    target = new Vector3(0, 0, 0)
  ) {
    super(color, intensity);
    this.type = 'SpotLight';
    this.angle = angle;
    this.penumbra = penumbra;
    this.decay = decay;
    this.target = target;
  }

  setTarget(x, y, z) {
    this.target.set(x, y, z);
    return this;
  }
}
