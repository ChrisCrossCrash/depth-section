import { useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import { Plane } from '@react-three/drei'
import { getCameraAimPos } from '../../utils/getCameraAimPos'
import { getSubcamSize } from '../../utils/getSubcamSize'
import { Html } from '@react-three/drei'

export const Debugger = () => {
  const threeState = useThree()
  const [camWidth, camHeight] = getSubcamSize(threeState)
  const ref = useRef<THREE.Group>(null)

  useFrame((threeState) => {
    const mesh = ref.current
    if (!mesh) return

    const [x, y] = getCameraAimPos(threeState)

    mesh.position.x = x
    mesh.position.y = y
  })

  return (
    <group ref={ref}>
      <Html
        position={[-camWidth / 2, camHeight / 2, 0]}
        style={{ color: 'white', padding: '0 0.5rem' }}
      >
        <div>
          <p>camWidth: {camWidth}</p>
          <p>camHeight: {camHeight}</p>
        </div>
      </Html>
      <Plane args={[camWidth, camHeight, 4, 4]}>
        <meshBasicMaterial attach='material' color='red' wireframe />
      </Plane>
      <Plane args={[camWidth, camHeight, 4, 4]} position={[0, 0, -1]}>
        <meshBasicMaterial attach='material' color='blue' wireframe />
      </Plane>
    </group>
  )
}
