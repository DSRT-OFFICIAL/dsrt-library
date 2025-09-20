import ShaderMaterial from './ShaderMaterial.js';
import SkyboxShader from '../shaders/SkyboxShader.js';

export default class SkyboxShaderMaterial extends ShaderMaterial {
  constructor(params = {}) {
    super({
      vertexShader: SkyboxShader.vertex,
      fragmentShader: SkyboxShader.fragment,
      uniforms: SkyboxShader.uniforms,
      ...params,
    });
  }
}
