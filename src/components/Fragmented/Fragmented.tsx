import { Suspense, useRef } from 'react'
import { DepthSection } from '../DepthSection/DepthSection'
import * as THREE from 'three'
import { useGLTF, Environment } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import type { GroupProps } from '@react-three/fiber'

const fragmentedModelUrl =
  'https://chriscrosscrash.github.io/depth-section/fragmented.glb'

useGLTF.preload(fragmentedModelUrl)

type FragmentedBGMeshProps = GroupProps & {
  materialProps?: JSX.IntrinsicElements['meshStandardMaterial']
}

const FragmentedBGMesh = ({
  materialProps,
  ...props
}: FragmentedBGMeshProps) => {
  const { nodes } = useGLTF(fragmentedModelUrl) as any
  const ref = useRef<THREE.Group>(null)

  useFrame((threeState) => {
    const mesh = ref.current
    if (!mesh) return

    const o = threeState.gl.domElement.getBoundingClientRect().top
    const w = window.innerHeight
    /** The scroll porgress, where -1 is entering an 1 is leaving screen. */
    const mappedProgress = (w - o) / w - 1
    // What is shown on the canvas is the subcam, which is 1/3 of the full
    // camera height, so we must divide viewport.height by 3 to get the height
    // of the subcam view in meters.
    const cameraAimHeight = (mappedProgress * threeState.viewport.height) / 3

    mesh.position.y = cameraAimHeight
  })

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={nodes.Grid.geometry} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial {...materialProps} />
      </mesh>
      <Environment preset='city' />
    </group>
  )
}

type FragmentedProps = {
  children?: React.ReactNode
  /** Three JS `meshStandardMaterial` properties.
   *
   * https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
   */
  materialProps?: JSX.IntrinsicElements['meshStandardMaterial']
  debug?: boolean
}

export const Fragmented = (props: FragmentedProps) => (
  <DepthSection htmlOverlay={props.children} debug={props.debug}>
    <Suspense fallback={null}>
      <FragmentedBGMesh
        scale={5}
        position={[0, 0, -5]}
        materialProps={props.materialProps}
      />
    </Suspense>
  </DepthSection>
)
