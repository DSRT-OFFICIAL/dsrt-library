export default /* glsl */`
struct DirectionalLight {
  vec3 direction;
  vec3 color;
};

uniform DirectionalLight directionalLight;

vec3 applyDirectionalLight(vec3 normal) {
  float diff = max(dot(normal, -directionalLight.direction), 0.0);
  return directionalLight.color * diff;
}
`;
