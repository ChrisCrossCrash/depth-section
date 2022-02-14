import { Suspense, useRef } from 'react'
import { DepthSection } from '../DepthSection/DepthSection'
import * as THREE from 'three'
import { useGLTF, Environment } from '@react-three/drei'
import { useFrame, MeshStandardMaterialProps } from '@react-three/fiber'
import type { GroupProps } from '@react-three/fiber'
import { getCameraAimPos } from '../../utils/getCameraAimPos'

const fragmentedModelUrl =
  'https://chriscrosscrash.github.io/depth-section/public/fragmented.glb'
const environmentHdriUrl =
  'https://chriscrosscrash.github.io/depth-section/public/lebombo_1k.hdr'

useGLTF.preload(fragmentedModelUrl)

type FragmentedBGMeshProps = GroupProps & {
  materialProps?: MeshStandardMaterialProps
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

    const [x, y] = getCameraAimPos(threeState)

    mesh.position.x = x
    mesh.position.y = y
  })

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={nodes.Grid.geometry} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial {...materialProps} />
      </mesh>
      <Environment files={environmentHdriUrl} />
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
