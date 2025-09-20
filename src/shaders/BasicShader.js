const BasicShader = {
  uniforms: {
    uColor: { value: [1.0, 1.0, 1.0] } // default putih (RGB)
  },

  vertexShader: /* glsl */`
    attribute vec3 position;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;

    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  fragmentShader: /* glsl */`
    precision mediump float;

    uniform vec3 uColor;

    void main() {
      gl_FragColor = vec4(uColor, 1.0);
    }
  `
};

export default BasicShader;
