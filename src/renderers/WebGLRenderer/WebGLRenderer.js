// WebGLRenderer.js
import ShaderProgram from './ShaderProgram.js';
import ShaderLib from '../../shaders/ShaderLib.js';

function hexToRgbArray(hex) {
  const bigint = parseInt(hex.replace('#', ''), 16);
  return [
    ((bigint >> 16) & 255) / 255,
    ((bigint >> 8) & 255) / 255,
    (bigint & 255) / 255
  ];
}

function buildWireframeIndices(triIndices) {
  // convert triangle indices to line indices (unique edges)
  const edges = new Set();
  for (let i = 0; i < triIndices.length; i += 3) {
    const a = triIndices[i], b = triIndices[i+1], c = triIndices[i+2];
    [[a,b],[b,c],[c,a]].forEach(([x,y])=>{
      const key = x<y ? `${x}_${y}` : `${y}_${x}`;
      edges.add(key);
    });
  }
  const lines = [];
  for (const e of edges) {
    const [x,y] = e.split('_').map(Number);
    lines.push(x, y);
  }
  return lines;
}

export default class WebGLRenderer {
  constructor({ canvas = null, alpha = false } = {}) {
    this.canvas = canvas || document.createElement('canvas');
    this.gl = this.canvas.getContext('webgl', { alpha }) || this.canvas.getContext('experimental-webgl', { alpha });
    if (!this.gl) throw new Error('WebGL not supported');

    this.setSize(window.innerWidth, window.innerHeight);

    // cache shader programs per material type
    this._programCache = new Map();

    // simple state
    this.clearColor = [0,0,0,1];
  }

  setSize(w, h) {
    this.canvas.width = w;
    this.canvas.height = h;
    this.gl.viewport(0, 0, w, h);
  }

  setClearColor(hex) {
    const c = hexToRgbArray(hex);
    this.clearColor = [c[0], c[1], c[2], 1.0];
    this.gl.clearColor(...this.clearColor);
  }

  clear() {
    const gl = this.gl;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  _getProgramForMaterial(material, customShaders = null) {
    const key = material.type + (customShaders ? '_custom' : '');
    if (this._programCache.has(key)) return this._programCache.get(key);

    // choose shader sources
    let lib = ShaderLib[material.type.toLowerCase()];
    if (!lib && customShaders) lib = customShaders;
    if (!lib) lib = ShaderLib.basic;

    const program = new ShaderProgram(this.gl, lib.vertex, lib.fragment);
    this._programCache.set(key, program);
    return program;
  }

  _createBuffer(data, target = this.gl.ARRAY_BUFFER, usage = this.gl.STATIC_DRAW) {
    const gl = this.gl;
    const buf = gl.createBuffer();
    gl.bindBuffer(target, buf);
    gl.bufferData(target, data, usage);
    return buf;
  }

  _setupAttribute(program, name, size, type, normalized, stride, offset, buffer) {
    const gl = this.gl;
    const loc = program.getAttribLocation(name);
    if (loc === -1 || loc === null) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, size, type, normalized, stride, offset);
  }

  _prepareGeometryBuffers(geometry) {
    const gl = this.gl;
    if (!geometry._buffers) geometry._buffers = {};

    if (!geometry._buffers.position) {
      geometry._buffers.position = this._createBuffer(new Float32Array(geometry.vertices));
    }
    if (!geometry._buffers.index) {
      // indices might be > 65535; we assume UNSIGNED_SHORT for simplicity
      geometry._buffers.index = this._createBuffer(new Uint16Array(geometry.indices), gl.ELEMENT_ARRAY_BUFFER);
      geometry._indexCount = geometry.indices.length;
    }
    if (geometry.normals && !geometry._buffers.normal) {
      geometry._buffers.normal = this._createBuffer(new Float32Array(geometry.normals));
    }
    // wireframe buffer
    if (!geometry._buffers.wireframe && geometry.indices) {
      const lines = buildWireframeIndices(geometry.indices);
      geometry._buffers.wireframe = this._createBuffer(new Uint16Array(lines), gl.ELEMENT_ARRAY_BUFFER);
      geometry._wireCount = lines.length;
    }

    return geometry._buffers;
  }

  _useMaterial(program, material, scene, camera) {
    const gl = this.gl;
    program.use();

    // common uniforms: color/opacity
    const uColorLoc = program.getUniformLocation('uColor');
    if (uColorLoc) {
      const rgb = hexToRgbArray(material.color || '#ffffff');
      gl.uniform3fv(uColorLoc, new Float32Array(rgb));
    }
    const uOpacityLoc = program.getUniformLocation('uOpacity');
    if (uOpacityLoc) gl.uniform1f(uOpacityLoc, material.opacity !== undefined ? material.opacity : 1.0);

    // camera matrices -> expects camera.projectionMatrix & camera.matrixWorldInverse (modelView handled per object)
    const projLoc = program.getUniformLocation('projectionMatrix');
    const mvLoc = program.getUniformLocation('modelViewMatrix');
    const normalLoc = program.getUniformLocation('normalMatrix');

    if (projLoc && camera.projectionMatrix) gl.uniformMatrix4fv(projLoc, false, camera.projectionMatrix.elements);
    // modelViewMatrix / normal matrix will be set per-object (we compute below)

    // lighting uniforms (simple): ambient + first directional light
    const ambient = program.getUniformLocation('uAmbient');
    const lightDir = program.getUniformLocation('uLightDirection');
    const lightColor = program.getUniformLocation('uLightColor');
    const specular = program.getUniformLocation('uSpecular');
    const shininess = program.getUniformLocation('uShininess');
    if (ambient) {
      // find ambient light in scene (AmbientLight type), fallback small ambient
      const amb = this._findAmbient(scene) || '#111111';
      gl.uniform3fv(ambient, new Float32Array(hexToRgbArray(amb)));
    }
    if (lightDir) {
      const dir = this._findDirectional(scene) || { x: 0, y: -1, z: 0 };
      // normalize direction
      const len = Math.hypot(dir.x, dir.y, dir.z) || 1;
      gl.uniform3fv(lightDir, new Float32Array([dir.x/len, dir.y/len, dir.z/len]));
    }
    if (lightColor) {
      const lc = this._findDirectionalColor(scene) || '#ffffff';
      gl.uniform3fv(lightColor, new Float32Array(hexToRgbArray(lc)));
    }
    if (specular) gl.uniform3fv(specular, new Float32Array(hexToRgbArray(material.specular || '#111111')));
    if (shininess) gl.uniform1f(shininess, material.shininess || 30.0);

    // additional shader-specific uniforms could be set here
  }

  _findAmbient(scene) {
    if (!scene || !scene.children) return null;
    for (const c of scene.children) {
      if (c.type === 'AmbientLight' || c.type === 'ambient') return c.color;
    }
    return null;
  }
  _findDirectional(scene) {
    if (!scene || !scene.children) return null;
    for (const c of scene.children) {
      if (c.type === 'DirectionalLight' || c.type === 'directional') {
        // assume c.direction is Vector3-like
        if (c.direction) return c.direction;
        return { x: 0, y: -1, z: 0 };
      }
    }
    return null;
  }
  _findDirectionalColor(scene) {
    if (!scene || !scene.children) return null;
    for (const c of scene.children) {
      if (c.type === 'DirectionalLight' || c.type === 'directional') return c.color;
    }
    return null;
  }

  _computeModelView(camera, object) {
    // For simplicity assume camera.matrixWorldInverse and object.matrixWorld provided as float arrays (Matrix4-like)
    // If you implemented Matrix4, ensure they expose .elements (Float32Array length 16)
    // modelView = camera.matrixWorldInverse * object.matrixWorld
    if (!camera || !camera.matrixWorldInverse || !object.matrixWorld) return null;
    // multiply 4x4 matrices: result = camera.matrixWorldInverse * object.matrixWorld
    const a = camera.matrixWorldInverse.elements;
    const b = object.matrixWorld.elements;
    const out = new Float32Array(16);

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let sum = 0;
        for (let k = 0; k < 4; k++) {
          sum += a[i*4 + k] * b[k*4 + j];
        }
        out[i*4 + j] = sum;
      }
    }
    return out;
  }

  render(scene, camera) {
    const gl = this.gl;
    if (scene.background) {
      this.setClearColor(scene.background);
    }
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // traverse scene and render objects that have geometry + material
    const drawList = [];
    scene.traverse && scene.traverse(obj => {
      if (obj.geometry && obj.material && obj.visible !== false) drawList.push(obj);
    });

    for (const obj of drawList) {
      this._renderObject(obj, scene, camera);
    }
  }

  _renderObject(object, scene, camera) {
    const gl = this.gl;
    const geometry = object.geometry;
    const material = object.material;

    if (!geometry || !material) return;

    const program = this._getProgramForMaterial(material, material.type === 'ShaderMaterial' ? {
      vertex: material.vertexShader,
      fragment: material.fragmentShader
    } : null);

    // prepare buffers
    const buffers = this._prepareGeometryBuffers(geometry);

    // bind index & position buffers
    // position attribute name assumed 'position'
    const posBuf = buffers.position;
    this._setupAttribute(program, 'position', 3, gl.FLOAT, false, 0, 0, posBuf);

    // normal attribute if present
    if (buffers.normal) {
      this._setupAttribute(program, 'normal', 3, gl.FLOAT, false, 0, 0, buffers.normal);
    }

    // bind index buffer for triangles
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);

    // compute modelViewMatrix uniform
    const modelView = this._computeModelView(camera, object) || (camera.projectionMatrix ? camera.projectionMatrix.elements : null);
    const modelViewLoc = program.getUniformLocation('modelViewMatrix');
    if (modelViewLoc && modelView) gl.uniformMatrix4fv(modelViewLoc, false, modelView);

    // projection handled in _useMaterial
    this._useMaterial(program, material, scene, camera);

    // face culling / blending
    if (material.transparent) {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.depthMask(false);
    } else {
      gl.disable(gl.BLEND);
      gl.depthMask(true);
    }

    // wireframe handling
    if (material.wireframe && buffers.wireframe) {
      // use wireframe index buffer
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.wireframe);
      gl.drawElements(gl.LINES, geometry._wireCount, gl.UNSIGNED_SHORT, 0);
      // restore triangle index buffer if needed
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);
    } else {
      // draw triangles
      gl.drawElements(gl.TRIANGLES, geometry._indexCount, gl.UNSIGNED_SHORT, 0);
    }

    // cleanup per-draw disabled states as needed
  }
  }
