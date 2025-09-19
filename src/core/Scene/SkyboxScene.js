import Scene from './Scene.js';

export default class SkyboxScene extends Scene {
  constructor(texture = null) {
    super();
    this.skybox = texture; // cube texture / panorama
  }

  setSkybox(texture) {
    this.skybox = texture;
    return this;
  }
}
