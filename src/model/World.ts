import { Object3DEntity } from "./Object3DEntity";

export type World = {
  objects: Map<number, Object3DEntity>
  camera: THREE.PerspectiveCamera
  scene: THREE.Scene
  renderer: THREE.WebGLRenderer
  time: {
    last: number
    delta: number
    elapsed: number
  }
}