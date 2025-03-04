import {useGLTF} from "@react-three/drei";
import {MeshTransmissionMaterial} from "@react-three/drei"
import {CuboidCollider, RigidBody, vec3} from '@react-three/rapier'
import {useEffect, useRef, useState} from "react";
import useGame from '../stores/useGame'
import {useControls} from "leva";
import { useMegicStore } from "../../../utils/useMegicStore";

export default function Table(props) {
    const {nodes, materials} = useGLTF("/models/table.gltf");
    const controlA = useRef(null)
    const controlB = useRef(null)
    const thrusterA = useRef(null)
    const thrusterB = useRef(null)

    const [isScored, setIsScored] = useState(false)

    const increaseMegicPoints = useMegicStore((state) => state.increaseMegicPoints)

    const {tableRestitution, tableFriction, glassRestitution, glassFriction} = useControls('table', {
        tableRestitution: {label: 'Table Restitution', value: 0.6, min: 0, max: 1, step: 0.1},
        tableFriction: {label: 'Table Friction', value: 0, min: 0, max: 10},
        glassRestitution: {label: 'Glass Restitution', value: 0.2, min: 0, max: 1, step: 0.1},
        glassFriction: {label: 'Glass Friction', value: 0, min: 0, max: 10},
    }, {collapsed: true})

    const increaseScore = useGame((state) => state.increment)
    // const decreaseScore = useGame((state) => state.decrement)

    const goal = () => {
        if(!isScored) {
            setIsScored(true)
            increaseScore()
            increaseMegicPoints()
            localStorage.setItem("megicPoints", useMegicStore.getState().megicPoints);
            useGame.setState({ isScored: true })
        }
    }

    const clickUp = (controlRef, isControlAPushed) => {
        if (controlRef.current) {
            useGame.setState({ [isControlAPushed ? 'isControlAPushed' : 'isControlBPushed']: false })
            controlRef.current.position.y = 0.128
        }
    }

    const clickDown = (controlRef, isControlAPushed) => {
        if (controlRef.current) {
            useGame.setState({ [isControlAPushed ? 'isControlAPushed' : 'isControlBPushed']: true })
            controlRef.current.position.y = 0.128 - 0.1
            // decreaseScore()
        }
    }

    useEffect(() => {
        const upY = 0.5

        const unsuscribeA = useGame.subscribe(
            (state) => state.isControlAPushed,
            (isControlAPushed) => {
                if (thrusterA.current) {
                    const position = vec3(thrusterA.current.translation())

                    if (isControlAPushed) {
                        thrusterA.current.setNextKinematicTranslation({
                            x: position.x,
                            y: position.y + upY,
                            z: position.z
                        })
                    } else {
                        thrusterA.current.setNextKinematicTranslation({
                            x: position.x,
                            y: position.y - upY,
                            z: position.z
                        })
                    }
                }
            }
        )

        const unsuscribeB = useGame.subscribe(
            (state) => state.isControlBPushed,
            (isControlBPushed) => {
                if (thrusterB.current) {
                    const position = vec3(thrusterB.current.translation())
                    if (isControlBPushed) {
                        thrusterB.current.setNextKinematicTranslation({
                            x: position.x,
                            y: position.y + upY,
                            z: position.z
                        })
                    } else {
                        thrusterB.current.setNextKinematicTranslation({
                            x: position.x,
                            y: position.y - upY,
                            z: position.z
                        })
                    }
                }
            }
        )

        const handleKeyDown = (event) => {
            if (event.key === 'a') {
                clickDown(controlA, true)
            } else if (event.key === 'd') {
                clickDown(controlB, false)
            }
        }

        const handleKeyUp = (event) => {
            if (event.key === 'a') {
                clickUp(controlA, true)
            } else if (event.key === 'd') {
                clickUp(controlB, false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
            unsuscribeA()
            unsuscribeB()
        }
    }, [])

    return (
        <group {...props} dispose={null} rotation={[0, -Math.PI / 2, 0]}>
            <RigidBody type="fixed" colliders="trimesh" restitution={tableRestitution} friction={tableFriction}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Table.geometry}
                    material={materials.Wood}
                    material-color="#DEB887"
                    material-envMapIntensity={0.5}
                    position={[0, 0.07, 0]}
                />

                <CuboidCollider
                    args={[0, 2, 1.5]}
                    position={[1.5, 1.5, 0]}
                    sensor
                    onIntersectionExit={() => {
                        setIsScored(false)
                    }}
                />
            </RigidBody>
            <RigidBody type="fixed" colliders="trimesh" restitution={glassRestitution} friction={glassFriction}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Glass.geometry}
                    position={[0.497, 1.54, 0.005]}
                >
                    <MeshTransmissionMaterial anisotropy={0.1} chromaticAberration={0.04} distortionScale={0}
                                              temporalDistortion={0}/>
                </mesh>
            </RigidBody>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Controls.geometry}
                material={materials.Wood}
                position={[4.135, 0.092, -0.003]}
            />
            <mesh
                ref={controlA}
                castShadow
                receiveShadow
                geometry={nodes.Control_A.geometry}
                material={materials.Red}
                position={[4.184, 0.128, 0.744]}
                onPointerUp={() => clickUp(controlA, true)}
                onPointerDown={() => clickDown(controlA, true)}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Control_A_Text.geometry}
                    material={materials.White}
                    position={[0.237, 0.046, 0.21]}
                    rotation={[Math.PI / 2, 1.179, -Math.PI / 2]}
                />
            </mesh>
            <mesh
                ref={controlB}
                castShadow
                receiveShadow
                geometry={nodes.Control_B.geometry}
                material={materials.Green}
                position={[4.183, 0.128, -0.754]}
                onPointerUp={() => clickUp(controlB, false)}
                onPointerDown={() => clickDown(controlB, false)}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Control_B_Text.geometry}
                    material={materials.White}
                    position={[0.25, 0.043, 0.207]}
                    rotation={[Math.PI / 2, 1.184, -Math.PI / 2]}
                />
            </mesh>
            <RigidBody
                ref={thrusterA}
                type="kinematicPosition"
                colliders="hull"
                lockRotations={true}
                enabledTranslations={[false, true, false]}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Thruster_A.geometry}
                    material={materials.Black}
                    position={[2.259, -0.189, 0.765]}
                />
            </RigidBody>
            <RigidBody
                ref={thrusterB}
                type="kinematicPosition"
                colliders="hull"
                lockRotations={true}
                enabledTranslations={[false, true, false]}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Thruster_B.geometry}
                    material={materials.Black}
                    position={[2.259, -0.189, -0.764]}
                />
            </RigidBody>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Hide_Thruster.geometry}
                material={materials.Black}
                position={[2.257, -0.047, 0]}
            />
            <RigidBody type="fixed" colliders="trimesh">
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Base.geometry}
                    material={materials.Wood}
                    position={[-2.235, 0.565, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder.geometry}
                    material={materials.Red}
                    position={[-2.235, 1.177, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Panel.geometry}
                    material={materials.Wood}
                    position={[-2.234, 1.814, 0]}
                />
                <CuboidCollider
                    args={[0.35, 0, 0.35]}
                    position={[-1.686, 1.40, 0]}
                    sensor
                    onIntersectionExit={goal}
                >
                    <mesh
                        castShadow
                        receiveShadow
                        position={[0, 0.06, 0]}
                        geometry={nodes.Ring.geometry}
                        material={materials.Red}
                    />
                </CuboidCollider>
            </RigidBody>
        </group>
    );
}

useGLTF.preload("/models/table.gltf");
