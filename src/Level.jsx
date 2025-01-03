import * as THREE from 'three'
import {RigidBody} from "@react-three/rapier";
import {useFrame} from "@react-three/fiber";
import {useRef} from "react";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' })
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' })
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' })
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' })

export default function Level() {
    return <>
        <BlockStart position={[0, 0, 4]}/>
        <BlockSpinner position={[0, 0, 0]}/>
    </>
}

function BlockStart({position = [0, 0, 0]}) {
    return <group position={position}>
        <mesh material={floor1Material} geometry={ boxGeometry } position={[0, -0.1, 0]} scale={[4, 0.2, 4]} receiveShadow />
    </group>
}

function BlockSpinner({position = [0, 0, 0]}) {
    const obstacle = useRef()

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        const rotation = new THREE.Quaternion()
        rotation.setFromEuler(new THREE.Euler(0, time, 0))
        obstacle.current.setNextKinematicRotation(rotation )
    })

    return <group position={position}>
        <mesh material={floor2Material} geometry={ boxGeometry } position={[0, -0.1, 0]} scale={[4, 0.2, 4]} receiveShadow />
        <RigidBody ref={obstacle} type={"kinematicPosition"} position={[0, 0.3, 0]} restitution={0.2} friction={0}>
            <mesh geometry={boxGeometry} material={obstacleMaterial} scale={[3.5, 0.3, 0.3]} castShadow receiveShadow/>
        </RigidBody>
    </group>
}