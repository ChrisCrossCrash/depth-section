import React, { Suspense } from 'react'
import { DepthSection } from '../DepthSection/DepthSection'
import * as THREE from 'three'
import { useGLTF, Environment } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Grid: THREE.Mesh
  }
  materials: Record<string, unknown>
}

useGLTF.preload('/fragmented-bg-transformed.glb')

const FragmentedBGMesh = React.forwardRef<JSX.IntrinsicElements['group'], any>(
  function Model({ ...props }, ref) {
    const { nodes } = useGLTF(
      'https://chriscrosscrash.github.io/depth-section/fragmented.glb'
    ) as GLTFResult
    return (
      <group ref={ref} {...props} dispose={null}>
        <mesh
          geometry={nodes.Grid.geometry}
          // material={nodes.Grid.material}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial
            color='#270082'
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>
        <Environment preset='city' />
      </group>
    )
  }
)

export const Fragmented = () => (
  <DepthSection>
    <Suspense fallback={null}>
      <FragmentedBGMesh scale={5} position={[0, 0, -5]} />
    </Suspense>
  </DepthSection>
)
