// ShaderProgram.js
export default class ShaderProgram {
  constructor(gl, vsSource, fsSource) {
    this.gl = gl;
    this.program = this._createProgram(vsSource, fsSource);
    this.attribLocations = {};
    this.uniformLocations = {};
  }

  _createShader(type, source) {
    const gl = this.gl;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const msg = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error('Shader compile error: ' + msg);
    }
    return shader;
  }

  _createProgram(vsSource, fsSource) {
    const gl = this.gl;
    const vs = this._createShader(gl.VERTEX_SHADER, vsSource);
    const fs = this._createShader(gl.FRAGMENT_SHADER, fsSource);
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const msg = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error('Program link error: ' + msg);
    }
    return program;
  }

  use() {
    this.gl.useProgram(this.program);
  }

  getAttribLocation(name) {
    if (!(name in this.attribLocations)) {
      this.attribLocations[name] = this.gl.getAttribLocation(this.program, name);
    }
    return this.attribLocations[name];
  }

  getUniformLocation(name) {
    if (!(name in this.uniformLocations)) {
      this.uniformLocations[name] = this.gl.getUniformLocation(this.program, name);
    }
    return this.uniformLocations[name];
  }
}
