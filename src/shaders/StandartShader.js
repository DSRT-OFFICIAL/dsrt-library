export default {
  vertex: /* glsl */`
    attribute vec3 position;
    attribute vec3 normal;
    attribute vec2 uv;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform mat3 normalMatrix;

    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      vUv = uv;

      gl_Position = projectionMatrix * vec4(vPosition, 1.0);
    }
  `,
  fragment: /* glsl */`
    precision mediump float;

    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;

    uniform vec3 albedo;
    uniform float roughness;
    uniform float metalness;
    uniform vec3 lightDirection;
    uniform vec3 lightColor;
    uniform vec3 cameraPosition;

    void main() {
      vec3 N = normalize(vNormal);
      vec3 V = normalize(cameraPosition - vPosition);
      vec3 L = normalize(-lightDirection);
      vec3 H = normalize(V + L);

      float NdotL = max(dot(N, L), 0.0);
      float NdotV = max(dot(N, V), 0.001);
      float NdotH = max(dot(N, H), 0.0);
      float VdotH = max(dot(V, H), 0.0);

      float alpha = roughness * roughness;
      float alpha2 = alpha * alpha;

      float denom = (NdotH * NdotH) * (alpha2 - 1.0) + 1.0;
      float D = alpha2 / (3.14159 * denom * denom);

      vec3 F0 = mix(vec3(0.04), albedo, metalness);
      vec3 F = F0 + (1.0 - F0) * pow(1.0 - VdotH, 5.0);

      float k = alpha / 2.0;
      float G_V = NdotV / (NdotV * (1.0 - k) + k);
      float G_L = NdotL / (NdotL * (1.0 - k) + k);
      float G = G_V * G_L;

      vec3 numerator = D * F * G;
      float denominator = 4.0 * NdotV * NdotL + 0.001;
      vec3 specular = numerator / denominator;

      vec3 kS = F;
      vec3 kD = (1.0 - kS) * (1.0 - metalness);

      vec3 diffuse = albedo / 3.14159;

      vec3 color = (kD * diffuse + specular) * lightColor * NdotL;

      gl_FragColor = vec4(color, 1.0);
    }
  `
};
