import Scene from './Scene.js';

export default class FogScene extends Scene {
  constructor(color = '#000000', density = 0.05) {
    super();
    this.fog = { color, density };
  }

  setFog(color, density) {
    this.fog = { color, density };
    return this;
  }
}
