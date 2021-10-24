import * as THREE from "three"
import { World } from "../model/World"
import * as bitECS from 'bitecs'

export const createWorld = (): World => {
  const world: World = bitECS.createWorld()

  world.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 )
  world.camera.position.z = 400

  world.scene = new THREE.Scene()

  world.renderer = new THREE.WebGLRenderer( { antialias: true } )
  world.renderer.setPixelRatio( window.devicePixelRatio )
  world.renderer.setSize( window.innerWidth, window.innerHeight )
  document.body.appendChild( world.renderer.domElement )

  window.addEventListener('resize', () => {

    world.camera.aspect = window.innerWidth / window.innerHeight
    world.camera.updateProjectionMatrix()

    world.renderer.setSize( window.innerWidth, window.innerHeight )

  })

  world.objects = new Map()

  world.time = { last: 0, delta: 0, elapsed: 0 }

  return world
}