import Scene from './Scene.js';

export default class ShadowScene extends Scene {
  constructor() {
    super();
    this.enableShadows = true;
  }

  setShadows(enabled) {
    this.enableShadows = enabled;
    return this;
  }
}
