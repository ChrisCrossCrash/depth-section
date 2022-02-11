import { useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import { Plane } from '@react-three/drei'

export const Debugger = () => {
  const { viewport, size } = useThree()

  const heightMesh = (viewport.height * size.height) / window.innerHeight / 3
  const widthMesh = (viewport.width * size.width) / window.innerWidth / 3
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
    <group ref={ref}>
      <Plane args={[widthMesh, heightMesh, 4, 4]}>
        <meshBasicMaterial attach='material' color='red' wireframe />
      </Plane>
      <Plane args={[widthMesh, heightMesh, 4, 4]} position={[0, 0, -1]}>
        <meshBasicMaterial attach='material' color='blue' wireframe />
      </Plane>
    </group>
  )
}
