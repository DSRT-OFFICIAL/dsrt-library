import Object3D from '../Object3D';

export default class Light extends Object3D {
  constructor(color = '#ffffff', intensity = 1.0) {
    super();
    this.color = color;
    this.intensity = intensity;
  }

  setColor(color) {
    this.color = color;
    return this;
  }

  setIntensity(intensity) {
    this.intensity = intensity;
    return this;
  }
}
