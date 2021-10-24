import { addComponent } from "bitecs"
import * as THREE from "three"
import { TransformComponent } from "./components"
import { createObject3DEntity } from "./function/createObject3DEntity"
import { createWorld } from "./function/createWorld"
import { pipeline } from "./pipeline"

const world = createWorld()


const parent = createObject3DEntity(world, new THREE.BoxGeometry(100,100,100))
addComponent(world, TransformComponent, parent.eid)
world.objects.set(parent.eid, parent)
world.scene.add(parent)

for (let i = 1; i <= 10; i++) {
  const size = 10 * (10-i)
  const obj3d = createObject3DEntity(world, new THREE.BoxGeometry(size,size,size))
  addComponent(world, TransformComponent, obj3d.eid)
  world.objects.set(obj3d.eid, obj3d)
  let last = world.objects.get(obj3d.eid-1)
  if (!last) parent.add(obj3d)
  else last.add(obj3d)
}


const update = () => {

  requestAnimationFrame( update )

  pipeline(world)
  
}

update()
