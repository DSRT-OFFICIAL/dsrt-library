import ShaderMaterial from './ShaderMaterial.js';
import NormalShader from '../shaders/NormalShader.js';

export default class NormalShaderMaterial extends ShaderMaterial {
  constructor(params = {}) {
    super({
      vertexShader: NormalShader.vertex,
      fragmentShader: NormalShader.fragment,
      uniforms: NormalShader.uniforms,
      ...params,
    });
  }
}
