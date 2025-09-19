import Object3D from '../Object3D';

export default class Scene extends Object3D {
  constructor() {
    super();
    this.background = null;
    this.fog = null;
  }

  setBackground(color) {
    this.background = color;
    return this;
  }

  setFog(fog) {
    this.fog = fog;
    return this;
  }
}
