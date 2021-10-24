import { World } from "../model/World";

export const renderSystem = (world: World) => {
  world.renderer.render(world.scene,world.camera)
  return world
}