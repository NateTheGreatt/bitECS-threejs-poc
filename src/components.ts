import { defineComponent, Types } from "bitecs"

const { f32 } = Types

export const Vector3Schema = { x: f32, y: f32, z: f32 }
export const QuaternionSchema = { x: f32, y: f32, z: f32, w: f32 }

export const TransformSchema = { 
  position: Vector3Schema,
  rotation: QuaternionSchema,
  scale: Vector3Schema, 
}

export type Vector3Component = {
  x: Float32Array
  y: Float32Array
  z: Float32Array
}

export type QuaternionComponent = {
  x: Float32Array
  y: Float32Array
  z: Float32Array
  w: Float32Array
}

export type TransformComponentType = {
  position: Vector3Component,
  rotation: QuaternionComponent,
  scale: Vector3Component,
}

export const TransformComponent = defineComponent<TransformComponentType>(TransformSchema)
