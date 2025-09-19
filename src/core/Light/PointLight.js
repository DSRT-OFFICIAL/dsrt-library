import Light from './Light.js';

export default class PointLight extends Light {
  constructor(color = '#ffffff', intensity = 1.0, distance = 0, decay = 1) {
    super(color, intensity);
    this.type = 'PointLight';
    this.distance = distance;
    this.decay = decay;
  }

  setDistance(distance) {
    this.distance = distance;
    return this;
  }

  setDecay(decay) {
    this.decay = decay;
    return this;
  }
}
