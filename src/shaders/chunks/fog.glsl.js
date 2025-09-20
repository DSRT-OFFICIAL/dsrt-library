export default /* glsl */`
  uniform vec3 fogColor;
  uniform float fogNear;
  uniform float fogFar;

  float getFogFactor(float depth) {
    float fogFactor = smoothstep(fogNear, fogFar, depth);
    return clamp(fogFactor, 0.0, 1.0);
  }
`;
