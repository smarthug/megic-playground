import { Outlines, useAnimations, useGLTF, useTexture } from '@react-three/drei'
import { useGraph } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import {  SkeletonUtils } from 'three-stdlib'

import { ANIMATIONS } from './constants'

const Pomodoro = ({ outline, animation = 'idle', timeScale = 1, ...props }) => {
  const group = useRef(null)

  const { scene, animations } = useGLTF(`models/starter_pomodoro.glb`)
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes } = useGraph(clone)

  const texture = useTexture(`textures/pomodoro_texture.jpg`)

  const animationData = useMemo(() => ANIMATIONS.pomodoro[animation], [animation])
  const { mixer } = useAnimations(animations, group)

  useEffect(() => {
    if (!group.current) return

    texture.wrapS = THREE.RepeatWrapping
    texture.repeat.x = -1
    texture.center.set(0.5, 0.5)
    texture.rotation = Math.PI
    texture.flipY = false

    const clip = THREE.AnimationClip.parse(animationData)
    const action = mixer.clipAction(clip, group.current)

    action.reset().fadeIn(0.2).play()

    return () => {
      action.fadeOut(0.2)
    }
  }, [texture, mixer, animationData])

  useEffect(() => {
    mixer.timeScale = timeScale
  }, [timeScale])

  return (
    <group ref={group} {...props} dispose={null}>
      <group>
        <group name="JointBase_Grp">
          <group name="Root_Character">
            <primitive object={nodes.Hip_JNT} />
            <group name="Tail_OffSet" position={[0, 0.185, -0.327]} rotation={[-0.775, 0, 0]}>
              <primitive object={nodes.Tail_M_1_JNT} />
            </group>
            <group name="Back_M_OffSet" position={[0, 0.862, -0.327]} rotation={[0.614, 0, 0]}>
              <primitive object={nodes.Back_M_1_JNT} />
            </group>
            <group name="Eyes_M_1_OffSet" position={[0, 0.728, 0.511]} rotation={[-0.253, 0, 0]}>
              <primitive object={nodes.Eyes_M_1_JNT} />
            </group>
            <group name="Ear_L_OffSet" position={[0.341, 0.875, 0.323]} rotation={[0.159, -0.519, 0.744]}>
              <primitive object={nodes.Ear_L_1_JNT} />
            </group>
            <group name="Ear_R_OffSet" position={[-0.341, 0.875, 0.323]} rotation={[-2.982, -0.519, 0.744]}>
              <primitive object={nodes.Ear_R_1_JNT} />
            </group>
            <group name="Horn_T_OffSet" position={[0, 0.979, 0.356]} rotation={[0.565, 0, 0]}>
              <primitive object={nodes.Horn_T_1_JNT} />
            </group>
            <group name="Mouth_1_OffSet" position={[0, 0.471, 0.537]} rotation={[0.07, 0, 0]}>
              <primitive object={nodes.Mouth_1_JNT} />
            </group>
            <group name="Horn_R_OffSet" position={[-0.114, 0.97, 0.35]} rotation={[-2.544, -0.021, -0.187]}>
              <primitive object={nodes.Horn_R_1_JNT} />
            </group>
            <group name="Horn_L_OffSet" position={[0.114, 0.97, 0.35]} rotation={[0.597, -0.021, -0.187]}>
              <primitive object={nodes.Horn_L_1_JNT} />
            </group>
            <primitive object={nodes.Root_Back_L_JNT} />
            <primitive object={nodes.Root_Back_M_JNT} />
            <primitive object={nodes.Root_Back_R_JNT} />
            <primitive object={nodes.Root_Ear_L_JNT} />
            <primitive object={nodes.Root_Ear_R_JNT} />
            <primitive object={nodes.Root_Eye_Accessory_L_JNT} />
            <primitive object={nodes.Root_Eye_Accessory_R_JNT} />
            <primitive object={nodes.Root_Eye_L_JNT} />
            <primitive object={nodes.Root_Eye_M_JNT} />
            <primitive object={nodes.Root_Eye_R_JNT} />
            <primitive object={nodes.Root_Horn_L_JNT} />
            <primitive object={nodes.Root_Horn_M_JNT} />
            <primitive object={nodes.Root_Horn_R_JNT} />
            <primitive object={nodes.Root_Horn_T_JNT} />
            <primitive object={nodes.Root_Mouth_Accessory_L_JNT} />
            <primitive object={nodes.Root_Mouth_Accessory_R_JNT} />
            <primitive object={nodes.Root_Mouth_JNT} />
            <primitive object={nodes.Root_Mouth_Model_JNT} />
            <primitive object={nodes.Root_Tail_L_JNT} />
            <primitive object={nodes.Root_Tail_M_JNT} />
            <primitive object={nodes.Root_Tail_R_JNT} />
            <primitive object={nodes.Root_Tools_JNT} />
          </group>
        </group>
        <group name="SM_Mesh">
          <skinnedMesh
            castShadow
            receiveShadow
            geometry={nodes.SM_Body.geometry}
            name="SM_Body"
            skeleton={nodes.SM_Body.skeleton}
          >
            <meshStandardMaterial map={texture} />
            {outline && (
              <Outlines
                angle={0}
                color={outline.color}
                opacity={outline.opacity}
                screenspace={false}
                thickness={outline.thickness}
                transparent={false}
              />
            )}
          </skinnedMesh>
          <skinnedMesh
            castShadow
            receiveShadow
            geometry={nodes.SM_Ear_R_1.geometry}
            name="SM_Ear_R_1"
            skeleton={nodes.SM_Ear_R_1.skeleton}
          >
            <meshStandardMaterial map={texture} />
            {outline && (
              <Outlines
                angle={0}
                color={outline.color}
                opacity={outline.opacity}
                screenspace={false}
                thickness={outline.thickness}
                transparent={false}
              />
            )}
          </skinnedMesh>
          <skinnedMesh
            castShadow
            receiveShadow
            geometry={nodes.SM_Ear_L_1.geometry}
            name="SM_Ear_L_1"
            skeleton={nodes.SM_Ear_L_1.skeleton}
          >
            <meshStandardMaterial map={texture} />
            {outline && (
              <Outlines
                angle={0}
                color={outline.color}
                opacity={outline.opacity}
                screenspace={false}
                thickness={outline.thickness}
                transparent={false}
              />
            )}
          </skinnedMesh>
          <skinnedMesh
            castShadow
            receiveShadow
            geometry={nodes.SM_Back_M_1.geometry}
            name="SM_Back_M_1"
            skeleton={nodes.SM_Back_M_1.skeleton}
          >
            <meshStandardMaterial map={texture} />
            {outline && (
              <Outlines
                angle={0}
                color={outline.color}
                opacity={outline.opacity}
                screenspace={false}
                thickness={outline.thickness}
                transparent={false}
              />
            )}
          </skinnedMesh>
          <skinnedMesh
            castShadow
            receiveShadow
            geometry={nodes.SM_Tail_M_1.geometry}
            name="SM_Tail_M_1"
            skeleton={nodes.SM_Tail_M_1.skeleton}
          >
            <meshStandardMaterial map={texture} />
            {outline && (
              <Outlines
                angle={0}
                color={outline.color}
                opacity={outline.opacity}
                screenspace={false}
                thickness={outline.thickness}
                transparent={false}
              />
            )}
          </skinnedMesh>
          <skinnedMesh
            castShadow
            receiveShadow
            geometry={nodes.SM_Horn_R_1.geometry}
            name="SM_Horn_R_1"
            skeleton={nodes.SM_Horn_R_1.skeleton}
          >
            <meshStandardMaterial map={texture} />
            {outline && (
              <Outlines
                angle={0}
                color={outline.color}
                opacity={outline.opacity}
                screenspace={false}
                thickness={outline.thickness}
                transparent={false}
              />
            )}
          </skinnedMesh>
          <skinnedMesh
            castShadow
            receiveShadow
            geometry={nodes.SM_Horn_L_1.geometry}
            name="SM_Horn_L_1"
            skeleton={nodes.SM_Horn_L_1.skeleton}
          >
            <meshStandardMaterial map={texture} />
            {outline && (
              <Outlines
                angle={0}
                color={outline.color}
                opacity={outline.opacity}
                screenspace={false}
                thickness={outline.thickness}
                transparent={false}
              />
            )}
          </skinnedMesh>
          <skinnedMesh
            castShadow
            receiveShadow
            geometry={nodes.SM_Horn_T_1.geometry}
            name="SM_Horn_T_1"
            skeleton={nodes.SM_Horn_T_1.skeleton}
          >
            <meshStandardMaterial map={texture} />
            {outline && (
              <Outlines
                angle={0}
                color={outline.color}
                opacity={outline.opacity}
                screenspace={false}
                thickness={outline.thickness}
                transparent={false}
              />
            )}
          </skinnedMesh>
          <skinnedMesh geometry={nodes.SM_Eye_M_1.geometry} name="SM_Eye_M_1" skeleton={nodes.SM_Eye_M_1.skeleton}>
            <meshStandardMaterial map={texture} />
          </skinnedMesh>
          <skinnedMesh
            castShadow
            receiveShadow
            geometry={nodes.SM_Mouth_1.geometry}
            name="SM_Mouth_1"
            skeleton={nodes.SM_Mouth_1.skeleton}
          >
            <meshStandardMaterial map={texture} />
          </skinnedMesh>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload(`models/starter_pomodoro.glb`)

export default Pomodoro
