export default class Vector4 {
  constructor(x=0,y=0,z=0,w=1){ this.x=x; this.y=y; this.z=z; this.w=w; }

  set(x,y,z,w){ this.x=x; this.y=y; this.z=z; this.w=w; return this; }
  clone(){ return new Vector4(this.x,this.y,this.z,this.w); }
  copy(v){ this.x=v.x; this.y=v.y; this.z=v.z; this.w=v.w; return this; }

  add(v){ this.x+=v.x; this.y+=v.y; this.z+=v.z; this.w+=v.w; return this; }
  addScalar(s){ this.x+=s; this.y+=s; this.z+=s; this.w+=s; return this; }
  subtract(v){ this.x-=v.x; this.y-=v.y; this.z-=v.z; this.w-=v.w; return this; }
  multiply(v){ this.x*=v.x; this.y*=v.y; this.z*=v.z; this.w*=v.w; return this; }
  multiplyScalar(s){ this.x*=s; this.y*=s; this.z*=s; this.w*=s; return this; }
  divide(v){ this.x/=v.x; this.y/=v.y; this.z/=v.z; this.w/=v.w; return this; }
  divideScalar(s){ return this.multiplyScalar(1/s); }

  length(){ return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z + this.w*this.w); }
  lengthSq(){ return this.x*this.x + this.y*this.y + this.z*this.z + this.w*this.w; }
  normalize(){ const l=this.length(); return l>0?this.divideScalar(l):this; }

  dot(v){ return this.x*v.x + this.y*v.y + this.z*v.z + this.w*v.w; }
  distanceTo(v){ return Math.sqrt(this.distanceToSquared(v)); }
  distanceToSquared(v){ const dx=this.x-v.x, dy=this.y-v.y, dz=this.z-v.z, dw=this.w-v.w; return dx*dx+dy*dy+dz*dz+dw*dw; }

  lerp(v,t){ this.x+=(v.x-this.x)*t; this.y+=(v.y-this.y)*t; this.z+=(v.z-this.z)*t; this.w+=(v.w-this.w)*t; return this; }
}
