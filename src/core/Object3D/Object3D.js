export default class Object3D {
  constructor() {
    this.position = { x: 0, y: 0, z: 0 };
    this.rotation = { x: 0, y: 0, z: 0 };
    this.scale = { x: 1, y: 1, z: 1 };
    this.children = [];
    this.parent = null;
    this.visible = true;
    this.name = '';
  }

  // ===============================
  // Child management
  // ===============================
  add(child) {
    if (!this.children.includes(child)) {
      this.children.push(child);
      child.parent = this;
    }
    return this;
  }

  remove(child) {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
      child.parent = null;
    }
    return this;
  }

  // ===============================
  // Transformations
  // ===============================
  translate(x, y, z) {
    this.position.x += x;
    this.position.y += y;
    this.position.z += z;
    return this;
  }

  rotate(rx, ry, rz) {
    this.rotation.x += rx;
    this.rotation.y += ry;
    this.rotation.z += rz;
    return this;
  }

  setScale(sx, sy, sz) {
    this.scale.x = sx;
    this.scale.y = sy;
    this.scale.z = sz;
    return this;
  }

  // ===============================
  // Utility
  // ===============================
  lookAt(target) {
    // simple placeholder: in real engine, compute rotation to face target
    const dx = target.x - this.position.x;
    const dy = target.y - this.position.y;
    const dz = target.z - this.position.z;
    this.rotation.y = Math.atan2(dx, dz);
    this.rotation.x = Math.atan2(dy, Math.sqrt(dx*dx + dz*dz));
    return this;
  }

  traverse(callback) {
    callback(this);
    for (const child of this.children) {
      child.traverse(callback);
    }
    return this;
  }

  clone() {
    const obj = new Object3D();
    obj.position = { ...this.position };
    obj.rotation = { ...this.rotation };
    obj.scale = { ...this.scale };
    obj.visible = this.visible;
    obj.name = this.name;
    for (const child of this.children) {
      obj.add(child.clone());
    }
    return obj;
  }
      }
