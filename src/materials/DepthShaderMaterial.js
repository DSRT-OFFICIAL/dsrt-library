import ShaderMaterial from './ShaderMaterial.js';
import DepthShader from '../shaders/DepthShader.js';

export default class DepthShaderMaterial extends ShaderMaterial {
  constructor(params = {}) {
    super({
      vertexShader: DepthShader.vertex,
      fragmentShader: DepthShader.fragment,
      uniforms: DepthShader.uniforms,
      ...params,
    });
  }
}
