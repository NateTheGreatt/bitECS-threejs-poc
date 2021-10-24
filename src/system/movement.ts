import { defineQuery } from "bitecs"
import { TransformComponent } from "../components"
import { World } from "../model/World"

export const movementQuery = defineQuery([TransformComponent])

export const movementSystem = (world: World) => {
  const { time: { delta, elapsed } } = world
  const ents = movementQuery(world)
  for (let i = 0; i < ents.length; i++) {
    const e = ents[i]
    const obj3d = world.objects.get(e)

    TransformComponent.rotation.x[e] += 0.0001 * delta
    TransformComponent.rotation.y[e] += 0.003 * delta
    TransformComponent.rotation.z[e] += 0.0005 * delta
    obj3d!.rotation._onChangeCallback()

    TransformComponent.position.x[e] += Math.sin(elapsed/1000) / 30 * delta
    TransformComponent.position.y[e] += Math.cos(elapsed/1000) / 30 * delta
    TransformComponent.position.z[e] += Math.cos(elapsed/1000) / 30 * delta

    // obj3d!.rotation.x += 0.001
    // obj3d!.rotation.y += 0.03
    // obj3d!.rotation.z += 0.005

    // obj3d!.position.x += Math.sin(world.time.elapsed/1000) / 10 * world.time.delta
    // obj3d!.position.y += Math.cos(world.time.elapsed/1000) / 10 * world.time.delta
    // obj3d!.position.z += Math.cos(world.time.elapsed/1000) / 10 * world.time.delta
  }
  return world
}
