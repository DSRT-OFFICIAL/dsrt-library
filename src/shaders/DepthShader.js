export default {
  vertex: /* glsl */`
    attribute vec3 position;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;

    varying float vDepth;

    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vDepth = -mvPosition.z;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragment: /* glsl */`
    precision mediump float;

    varying float vDepth;
    uniform float near;
    uniform float far;

    void main() {
      float depth = (vDepth - near) / (far - near);
      gl_FragColor = vec4(vec3(depth), 1.0);
    }
  `
};
