import { Suspense } from 'react'
import { DepthSection } from '../DepthSection/DepthSection'
import * as THREE from 'three'
import { useGLTF, Environment } from '@react-three/drei'
import type { GroupProps } from '@react-three/fiber'
import { GLTF } from 'three-stdlib'

const fragmentedModelUrl =
  'https://chriscrosscrash.github.io/depth-section/fragmented.glb'

type GtlfWithNodes = GLTF & { nodes: { Grid: THREE.Mesh } }

useGLTF.preload(fragmentedModelUrl)

type FragmentedBGMeshProps = GroupProps

const FragmentedBGMesh = (props: FragmentedBGMeshProps) => {
  const { nodes } = useGLTF(fragmentedModelUrl) as GtlfWithNodes
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Grid.geometry} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color='#270082' roughness={0.3} metalness={0.5} />
      </mesh>
      <Environment preset='city' />
    </group>
  )
}

type FragmentedProps = {
  children?: React.ReactNode
}

export const Fragmented = (props: FragmentedProps) => (
  <DepthSection htmlOverlay={props.children}>
    <Suspense fallback={null}>
      <FragmentedBGMesh scale={5} position={[0, 0, -5]} />
    </Suspense>
  </DepthSection>
)
