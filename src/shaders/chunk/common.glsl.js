export default /* glsl */`
vec3 inverseTransformDirection(in vec3 dir, in mat4 matrix) {
  return normalize((vec4(dir, 0.0) * matrix).xyz);
}

float saturate(float x) {
  return clamp(x, 0.0, 1.0);
}
`;
