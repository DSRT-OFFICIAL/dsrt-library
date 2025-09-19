export default class Material {
  constructor({
    name = '',
    color = '#ffffff',
    wireframe = false,
    opacity = 1.0,
    transparent = false,
    visible = true,
    side = 'front', // front | back | double
    depthTest = true,
    depthWrite = true,
    alphaTest = 0,
    blending = 'normal', // normal | additive | subtractive | multiply
    polygonOffset = false,
    polygonOffsetFactor = 0,
    polygonOffsetUnits = 0,
  } = {}) {
    this.name = name;
    this.color = color;
    this.wireframe = wireframe;
    this.opacity = opacity;
    this.transparent = transparent;
    this.visible = visible;
    this.side = side;
    this.depthTest = depthTest;
    this.depthWrite = depthWrite;
    this.alphaTest = alphaTest;
    this.blending = blending;
    this.polygonOffset = polygonOffset;
    this.polygonOffsetFactor = polygonOffsetFactor;
    this.polygonOffsetUnits = polygonOffsetUnits;
  }

  clone() {
    return new this.constructor({ ...this });
  }
}
