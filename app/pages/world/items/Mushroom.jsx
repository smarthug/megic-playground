/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 c:\Users\mouli\Mario-Bros.js\public\mushroom.glb -o c:\Users\mouli\Mario-Bros.js\public\mushroom..js 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Mushroom(props) {
  const { nodes, materials } = useGLTF('models/mushroom.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.KinokoSuper__KinokoSuperMat00_1.geometry} material={materials.KinokoSuperMat00} />
    </group>
  )
}

useGLTF.preload('models/mushroom.glb')
