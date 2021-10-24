import { defineQuery } from "bitecs"
import { TransformComponent } from "../components"
import { World } from "../model/World"

export const movementQuery = defineQuery([TransformComponent])

export const movementSystem = (world: World) => {
  const ents = movementQuery(world)
  for (let i = 0; i < ents.length; i++) {
    const e = ents[i]
    const obj3d = world.objects.get(e)

    TransformComponent.rotation.x[e] += 0.001
    TransformComponent.rotation.y[e] += 0.03
    TransformComponent.rotation.z[e] += 0.005
    obj3d!.rotation._onChangeCallback()

    TransformComponent.position.x[e] += Math.sin(world.time.elapsed/1000) / 10 * world.time.delta
    TransformComponent.position.y[e] += Math.cos(world.time.elapsed/1000) / 10 * world.time.delta
    TransformComponent.position.z[e] += Math.cos(world.time.elapsed/1000) / 10 * world.time.delta
  }
  return world
}
