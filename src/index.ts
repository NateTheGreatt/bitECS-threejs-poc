import { addComponent } from "bitecs"
import * as THREE from "three"
import { TransformComponent } from "./components"
import { createObject3DEntity } from "./function/createObject3DEntity"
import { createWorld } from "./function/createWorld"
import { pipeline } from "./pipeline"

const world = createWorld()

for (let i = 1; i <= 3; i++) {
  const size = 50 * i
  const obj3d = createObject3DEntity(world, new THREE.BoxGeometry(size,size,size))
  addComponent(world, TransformComponent, obj3d.eid)
  world.objects.set(obj3d.eid, obj3d)
  world.scene.add(obj3d)
}

const update = () => {

  requestAnimationFrame( update )

  pipeline(world)
  
}

update()
