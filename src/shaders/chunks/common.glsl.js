export default /* glsl */`
  vec3 linearToGamma(vec3 value, float gammaFactor) {
    return pow(value, vec3(1.0 / gammaFactor));
  }

  vec3 gammaToLinear(vec3 value, float gammaFactor) {
    return pow(value, vec3(gammaFactor));
  }
`;
