import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import './App.css'
import type { Mesh } from 'three'

type BoxProps = JSX.IntrinsicElements['mesh']

const Box = (props: BoxProps) => {
  const mesh = useRef<Mesh>(null!)

  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)

  useFrame(() => (mesh.current.rotation.y += 0.01))

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={isActive ? 1.5 : 1}
      onClick={() => setIsActive(!isActive)}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={isHovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function App() {
  // const gltf = useLoader(GLTFLoader, '/donut.glb')
  return (
    <div id='three-wrapper'>
      <Canvas camera={{ fov: 55 }}>
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  )
}

export default App
