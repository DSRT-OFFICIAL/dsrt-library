// ShaderLib.js
// Minimal, readable shaders. You can replace with file imports if toolchain supports .glsl

export const basicVertex = `
attribute vec3 position;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const basicFragment = `
precision mediump float;
uniform vec3 uColor;
uniform float uOpacity;
void main() {
  gl_FragColor = vec4(uColor, uOpacity);
}
`;

/* Lambert (diffuse) - single directional light + ambient */
export const lambertVertex = basicVertex; // same vertex
export const lambertFragment = `
precision mediump float;
uniform vec3 uColor;
uniform float uOpacity;
uniform vec3 uAmbient;
uniform vec3 uLightDirection;
uniform vec3 uLightColor;

void main() {
  // Note: no normals passed -> approximate normal from position for demo
  vec3 N = normalize(vec3(0.0, 0.0, 1.0)); // placeholder if no normals
  float diff = max(dot(N, -uLightDirection), 0.0);
  vec3 color = uAmbient * uColor + diff * uLightColor * uColor;
  gl_FragColor = vec4(color, uOpacity);
}
`;

/* Phong - basic */
export const phongVertex = `
attribute vec3 position;
attribute vec3 normal;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;
varying vec3 vNormal;
varying vec3 vPosition;
void main() {
  vNormal = normalize(normalMatrix * normal);
  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
  vPosition = mvPos.xyz;
  gl_Position = projectionMatrix * mvPos;
}
`;
export const phongFragment = `
precision mediump float;
varying vec3 vNormal;
varying vec3 vPosition;

uniform vec3 uColor;
uniform float uOpacity;

uniform vec3 uAmbient;
uniform vec3 uLightDirection;
uniform vec3 uLightColor;
uniform vec3 uSpecular;
uniform float uShininess;
uniform vec3 uCameraPosition;

void main() {
  vec3 N = normalize(vNormal);
  vec3 L = normalize(-uLightDirection);
  float lambertTerm = max(dot(N, L), 0.0);
  vec3 diffuse = uLightColor * uColor * lambertTerm;
  vec3 ambient = uAmbient * uColor;

  // specular
  vec3 V = normalize(-vPosition);
  vec3 R = reflect(-L, N);
  float spec = pow(max(dot(R, V), 0.0), uShininess);
  vec3 specular = uSpecular * spec;

  vec3 color = ambient + diffuse + specular;
  gl_FragColor = vec4(color, uOpacity);
}
`;

/* Normal visualization */
export const normalVertex = basicVertex;
export const normalFragment = `
precision mediump float;
uniform float uOpacity;
void main() {
  vec3 n = vec3(0.0, 0.0, 1.0);
  // static normal because no varying normal pipeline in simple pipeline
  vec3 color = (n * 0.5) + 0.5;
  gl_FragColor = vec4(color, uOpacity);
}
`;

/* Depth visualization */
export const depthVertex = basicVertex;
export const depthFragment = `
precision mediump float;
uniform float uOpacity;
varying float vDepth;
void main() {
  float d = gl_FragCoord.z;
  gl_FragColor = vec4(vec3(d), uOpacity);
}
`;

/* ShaderMaterial will use user-provided sources. */

export default {
  basic: { vertex: basicVertex, fragment: basicFragment },
  lambert: { vertex: lambertVertex, fragment: lambertFragment },
  phong: { vertex: phongVertex, fragment: phongFragment },
  normal: { vertex: normalVertex, fragment: normalFragment },
  depth: { vertex: depthVertex, fragment: depthFragment },
};
