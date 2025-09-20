export default /* glsl */`
uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;

vec3 applyFog(vec3 color, float depth) {
  float fogFactor = smoothstep(fogNear, fogFar, depth);
  return mix(color, fogColor, fogFactor);
}
`;
