export default {
  vertex: /* glsl */`
    attribute vec3 position;
    varying vec3 vPosition;

    uniform mat4 projectionMatrix;
    uniform mat4 viewMatrix;

    void main() {
      vPosition = position;
      vec4 pos = projectionMatrix * viewMatrix * vec4(position, 1.0);
      gl_Position = pos.xyww; // depth = 1.0 → selalu di belakang
    }
  `,
  fragment: /* glsl */`
    precision mediump float;

    varying vec3 vPosition;
    uniform samplerCube skybox;

    void main() {
      gl_FragColor = textureCube(skybox, normalize(vPosition));
    }
  `
};
