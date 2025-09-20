import ShaderMaterial from './ShaderMaterial.js';
import StandardShader from '../shaders/StandardShader.js';

export default class StandardShaderMaterial extends ShaderMaterial {
  constructor(params = {}) {
    super({
      vertexShader: StandardShader.vertex,
      fragmentShader: StandardShader.fragment,
      uniforms: StandardShader.uniforms,
      ...params,
    });
  }
}
