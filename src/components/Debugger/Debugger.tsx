import React from 'react'
import { useThree } from '@react-three/fiber'

export const Debugger = () => {
  const { viewport, size } = useThree()

  const heightFraction = size.height / window.innerHeight / 3

  return (
    <>
      <mesh>
        <planeBufferGeometry
          attach='geometry'
          args={[
            viewport.width * 0.333,
            viewport.height * heightFraction,
            4,
            4,
          ]}
        />
        <meshBasicMaterial attach='material' color='red' wireframe />
      </mesh>
      <mesh position={[0, 0, -1]}>
        <planeBufferGeometry
          attach='geometry'
          args={[
            viewport.width * 0.333,
            viewport.height * heightFraction,
            4,
            4,
          ]}
        />
        <meshBasicMaterial attach='material' color='blue' wireframe />
      </mesh>
    </>
  )
}
