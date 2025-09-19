export default class Geometry {
  constructor() {
    this.vertices = [];
    this.indices = [];
    this.uvs = [];
    this.normals = [];
  }

  setVertices(vertices) {
    this.vertices = vertices;
    return this;
  }

  setIndices(indices) {
    this.indices = indices;
    return this;
  }

  setUVs(uvs) {
    this.uvs = uvs;
    return this;
  }

  setNormals(normals) {
    this.normals = normals;
    return this;
  }
}
