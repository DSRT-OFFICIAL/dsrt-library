import ShaderMaterial from './ShaderMaterial.js';
import PhongShader from '../shaders/PhongShader.js';

export default class PhongShaderMaterial extends ShaderMaterial {
  constructor(params = {}) {
    super({
      vertexShader: PhongShader.vertex,
      fragmentShader: PhongShader.fragment,
      uniforms: PhongShader.uniforms,
      ...params,
    });
  }
}
