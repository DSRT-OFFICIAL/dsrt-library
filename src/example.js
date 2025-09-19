// Import semua dari root math
import { Vector2, Vector3, Vector4, Matrix2, Matrix3, Matrix4, Quaternion, Red, Blue, Grey } from './math';

// ===============================
// Vector Examples
// ===============================
const v2 = new Vector2(1, 2);
const v3 = new Vector3(1, 2, 3);
const v4 = new Vector4(1, 2, 3, 1);

console.log('Vector2:', v2);
console.log('Vector3:', v3);
console.log('Vector4:', v4);

// Vector operations
v2.add(new Vector2(3, 4));
v3.multiplyScalar(2);
v4.lerp(new Vector4(4,5,6,1), 0.5);

console.log('Vector2 after add:', v2);
console.log('Vector3 after multiplyScalar:', v3);
console.log('Vector4 after lerp:', v4);

// ===============================
// Matrix Examples
// ===============================
const m2 = new Matrix2().identity();
const m3 = new Matrix3().identity();
const m4 = new Matrix4().identity();

console.log('Matrix2:', m2.elements);
console.log('Matrix3:', m3.elements);
console.log('Matrix4:', m4.elements);

// Multiply example
m2.multiply(new Matrix2().identity());
m3.multiply(new Matrix3().identity());
m4.multiply(new Matrix4().identity());

// ===============================
// Quaternion Examples
// ===============================
const q1 = Quaternion.identity();
const q2 = Quaternion.fromEuler({ x: Math.PI/2, y: 0, z: 0 });
const q3 = Quaternion.fromAxisAngle({ x:0, y:1, z:0 }, Math.PI/4);

console.log('Quaternion identity:', q1);
console.log('Quaternion from Euler:', q2);
console.log('Quaternion from AxisAngle:', q3);

// Slerp example
const qSlerp = q1.clone().slerp(q2, 0.5);
console.log('Quaternion Slerp:', qSlerp);

// ===============================
// Color Examples
// ===============================
console.log('Red color:', Red);
console.log('Blue color:', Blue);
console.log('Grey color:', Grey);

// Example usage in DOM (if running in browser)
if (typeof document !== 'undefined') {
  const div = document.createElement('div');
  div.textContent = 'Hello DSRT Library!';
  div.style.color = Red;
  div.style.backgroundColor = Grey;
  div.style.padding = '20px';
  document.body.appendChild(div);
}
