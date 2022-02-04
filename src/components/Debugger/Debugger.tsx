import React from 'react'
import { useThree } from '@react-three/fiber'

export const Debugger = () => {
  const { viewport, size } = useThree()

  const heightMesh = (viewport.height * size.height) / window.innerHeight / 3
  const widthMesh = (viewport.width * size.width) / window.innerWidth / 3

  return (
    <>
      <mesh>
        <planeBufferGeometry
          attach='geometry'
          args={[widthMesh, heightMesh, 4, 4]}
        />
        <meshBasicMaterial attach='material' color='red' wireframe />
      </mesh>
      <mesh position={[0, 0, -1]}>
        <planeBufferGeometry
          attach='geometry'
          args={[widthMesh, heightMesh, 4, 4]}
        />
        <meshBasicMaterial attach='material' color='blue' wireframe />
      </mesh>
    </>
  )
}
