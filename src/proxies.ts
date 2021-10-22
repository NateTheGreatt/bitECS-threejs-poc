import * as THREE from "three"
import { ComponentType, Component, ListType, IComponent } from "bitecs"
import { QuaternionComponent, TransformComponent, Vector3Component, Vector3Schema } from "./components"
import { Vector3 } from "three";


type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

// interface A {
//     name: string;
//     color?: string;
// }

// // redefine name to be string | number
// type B = Merge<A, {
//     name: string | number;
//     favorite?: boolean;
// }>;

// let one: A = {
//     name: 'asdf',
//     color: 'blue'
// };

// // A can become B because the types are all compatible
// let two: B = one;

// let three: B = {
//     name: 1
// };

// three.name = 'Bee';
// three.favorite = true;
// three.color = 'green';

// // B cannot become A because the type of name (string | number) isn't compatible
// // with A even though the value is a string
// // Error: Type {...} is not assignable to type A
// let four: A = three;



export abstract class BaseProxy {
  protected store: any
  protected eid: number
  constructor(store: Component, eid: number) {
    this.store = store
    this.eid = eid
  }
  load (eid: number) { this.eid = eid }
}

// export type Vector3Base = BaseProxy & THREE.Vector3

// type Vector3Base = Merge<BaseProxy, THREE.Vector3>

// type X = Vector3BaseProxy | THREE.Vector3


export class Vector3Proxy extends BaseProxy {
  constructor(store: Vector3Component, eid: number) { super(store, eid) }
  get x () { return this.store.x[this.eid] }
  get y () { return this.store.y[this.eid] }
  get z () { return this.store.z[this.eid] }
  set x (n) { this.store.x[this.eid] = n }
  set y (n) { this.store.y[this.eid] = n }
  set z (n) { this.store.z[this.eid] = n }
}

export class QuaternionProxy extends BaseProxy {
  constructor(store: QuaternionComponent, eid: number) { super(store, eid) }
  get x () { return this.store.x[this.eid] }
  get y () { return this.store.y[this.eid] }
  get z () { return this.store.z[this.eid] }
  get w () { return this.store.w[this.eid] }
  set x (n) { this.store.x[this.eid] = n }
  set y (n) { this.store.y[this.eid] = n }
  set z (n) { this.store.z[this.eid] = n }
  set w (n) { this.store.w[this.eid] = n }
}

export class Object3DProxy {
  position: Vector3Proxy
  quaternion: QuaternionProxy
  scale: Vector3Proxy
  constructor(store: typeof TransformComponent, eid: number) {
    // super()
    this.position = new Vector3Proxy(store.position, eid)
    this.quaternion  = new QuaternionProxy(store.rotation, eid)
    this.scale = new Vector3Proxy(store.scale, eid)
  }
  load (eid: number) {
    this.position.load(eid)
    this.quaternion.load(eid)
    this.scale.load(eid)
  }
}