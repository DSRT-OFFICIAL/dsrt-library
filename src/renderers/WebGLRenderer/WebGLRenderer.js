export default class WebGLRenderer {
  constructor({ canvas = null } = {}) {
    this.canvas = canvas || document.createElement('canvas');
    this.gl = this.canvas.getContext('webgl');

    if (!this.gl) {
      throw new Error('WebGL tidak didukung di browser ini.');
    }

    this.setSize(window.innerWidth, window.innerHeight);
  }

  setSize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.gl.viewport(0, 0, width, height);
  }

  setClearColor(color) {
    const gl = this.gl;
    const r = parseInt(color.substr(1, 2), 16) / 255;
    const g = parseInt(color.substr(3, 2), 16) / 255;
    const b = parseInt(color.substr(5, 2), 16) / 255;
    gl.clearColor(r, g, b, 1.0);
  }

  clear() {
    const gl = this.gl;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  render(scene, camera) {
    const gl = this.gl;

    // 1. Clear canvas dengan background scene
    if (scene.background) {
      this.setClearColor(scene.background);
    }
    this.clear();

    // 2. Loop object3D dalam scene
    scene.children.forEach((obj) => {
      if (obj.geometry) {
        this._renderObject(obj, camera);
      }
    });
  }

  _renderObject(object, camera) {
    const gl = this.gl;

    // 👉 sementara: hanya render warna "flat" tanpa shader
    // next step kita bikin Shader.js dan Material.js

    console.log('Rendering object:', object.name || 'Unnamed Object');
    console.log('Vertices:', object.geometry.vertices.length);
    console.log('Indices:', object.geometry.indices.length);

    // placeholder → WebGL drawArrays/drawElements masuk sini
  }
}
