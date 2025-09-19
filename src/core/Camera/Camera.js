import Object3D from '../Object3D';

export default class Camera extends Object3D {
  constructor() {
    super();
    this.projectionMatrix = null;
  }

  updateProjectionMatrix() {
    // Placeholder, akan di-override oleh subclass
    console.warn('updateProjectionMatrix() harus diimplementasi di subclass Camera.');
  }
}
