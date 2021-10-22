import { addEntity, createWorld } from "bitecs"
import * as THREE from "three"
import { TransformComponent } from "./components"

let camera: THREE.PerspectiveCamera, 
    scene: THREE.Scene, 
    renderer: THREE.WebGLRenderer,
    mesh: THREE.Mesh

init()
animate()

function init() {

  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 )
  camera.position.z = 400

  scene = new THREE.Scene()

  const geometry = new THREE.BoxGeometry( 200, 200, 200 )
  const material = new THREE.MeshBasicMaterial( { wireframe: true } )

  mesh = new THREE.Mesh(geometry, material)

  mesh.add(new THREE.Mesh(new THREE.BoxGeometry( 20, 20, 20 ),material))
  mesh.add(new THREE.Mesh(new THREE.BoxGeometry( 100, 100, 100 ),material))

  const world = createWorld()

  const e = addEntity(world)

  const {rotation} = TransformComponent

  Object.defineProperty(mesh.rotation, 'eid', { get: () => e })
  Object.defineProperty(mesh.rotation, 'store', { get: () => rotation })
  Object.defineProperty(mesh.rotation, '_x', {
    get () { return this.store.x[this.eid] },
    set (n) { this.store.x[this.eid] = n }
  })
  Object.defineProperty(mesh.rotation, '_y', {
    get () { return this.store.y[this.eid] },
    set (n) { this.store.y[this.eid] = n }
  })
  Object.defineProperty(mesh.rotation, '_z', {
    get () { return this.store.z[this.eid] },
    set (n) { this.store.z[this.eid] = n }
  })

  renderer = new THREE.WebGLRenderer( { antialias: true } )
  renderer.setPixelRatio( window.devicePixelRatio )
  renderer.setSize( window.innerWidth, window.innerHeight )
  document.body.appendChild( renderer.domElement )

  scene.add( mesh )

  window.addEventListener( 'resize', onWindowResize )

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize( window.innerWidth, window.innerHeight )

}

function animate() {

  requestAnimationFrame( animate )

  mesh.rotation.x += 0.005
  TransformComponent.rotation.y[0] += 0.01

  mesh.rotation._onChangeCallback()

  renderer.render( scene, camera )

}