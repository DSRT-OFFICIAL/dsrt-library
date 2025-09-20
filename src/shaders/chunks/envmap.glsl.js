export default /* glsl */`
  uniform samplerCube envMap;

  vec3 getEnvironmentColor(vec3 reflectDir) {
    return textureCube(envMap, reflectDir).rgb;
  }
`;
