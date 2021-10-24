import { World } from "../model/World";

export const timeSystem = (world:World) => {
  const now = performance.now()
  world.time.delta = now - world.time.last
  world.time.elapsed += world.time.delta
  world.time.last = now
  return world
}