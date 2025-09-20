export default {
  vertex: /* glsl */`
    attribute vec3 position;
    attribute vec3 normal;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform mat3 normalMatrix;

    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * vec4(vPosition, 1.0);
    }
  `,
  fragment: /* glsl */`
    precision mediump float;

    varying vec3 vNormal;
    varying vec3 vPosition;

    uniform vec3 color;
    uniform vec3 lightDirection;
    uniform vec3 cameraPosition;

    void main() {
      vec3 N = normalize(vNormal);
      vec3 L = normalize(-lightDirection);
      vec3 V = normalize(cameraPosition - vPosition);
      vec3 R = reflect(-L, N);

      float diff = max(dot(N, L), 0.0);
      float spec = pow(max(dot(R, V), 0.0), 16.0);

      gl_FragColor = vec4(color * diff + spec, 1.0);
    }
  `
};
