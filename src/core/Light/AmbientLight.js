import Light from './Light.js';

export default class AmbientLight extends Light {
  constructor(color = '#ffffff', intensity = 1.0) {
    super(color, intensity);
    this.type = 'AmbientLight';
  }
}
