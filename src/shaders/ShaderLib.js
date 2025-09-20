import BasicShader from './BasicShader.js';
import LambertShader from './LambertShader.js';
import PhongShader from './PhongShader.js';
import StandardShader from './StandardShader.js';
import DepthShader from './DepthShader.js';
import NormalShader from './NormalShader.js';
import SkyboxShader from './SkyboxShader.js';

const ShaderLib = {
  basic: BasicShader,
  lambert: LambertShader,
  phong: PhongShader,
  standard: StandardShader,
  depth: DepthShader,
  normal: NormalShader,
  skybox: SkyboxShader,
};

export default ShaderLib;
