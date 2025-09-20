export default {
  vertex: /* glsl */`
    attribute vec3 position;
    attribute vec3 normal;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform mat3 normalMatrix;

    varying vec3 vNormal;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragment: /* glsl */`
    precision mediump float;

    varying vec3 vNormal;
    uniform vec3 color;
    uniform vec3 lightDirection;

    void main() {
      float diff = max(dot(vNormal, normalize(-lightDirection)), 0.0);
      gl_FragColor = vec4(color * diff, 1.0);
    }
  `
};
