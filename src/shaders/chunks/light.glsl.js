export default /* glsl */`
  struct DirectionalLight {
    vec3 direction;
    vec3 color;
  };

  uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];

  vec3 getDirectionalLightIrradiance(DirectionalLight light, vec3 normal) {
    float ndl = max(dot(normal, -light.direction), 0.0);
    return light.color * ndl;
  }
`;
