import ShaderMaterial from './ShaderMaterial.js';
import LambertShader from '../shaders/LambertShader.js';

export default class LambertShaderMaterial extends ShaderMaterial {
  constructor(params = {}) {
    super({
      vertexShader: LambertShader.vertex,
      fragmentShader: LambertShader.fragment,
      uniforms: LambertShader.uniforms,
      ...params,
    });
  }
}
