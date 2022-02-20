import { Suspense, useRef } from 'react'
import { DepthSection } from '../DepthSection/DepthSection'
import * as THREE from 'three'
import { Sphere, Torus } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { getCameraAimPos } from '../../utils/getCameraAimPos'

const FloatySphereInner = () => {
  const sphereRef = useRef<THREE.Mesh>(null)
  const torusRef = useRef<THREE.Mesh>(null)

  useFrame((threeState) => {
    getCameraAimPos(threeState)
    const sphereMesh = sphereRef.current
    const torusMesh = torusRef.current

    if (!sphereMesh || !torusMesh) return

    const [x, y] = getCameraAimPos(threeState)

    torusMesh.position.y = y
    torusMesh.position.x = x
    sphereMesh.position.y = THREE.MathUtils.lerp(y, sphereMesh.position.y, 0.85)
    sphereMesh.position.x = x
  })

  return (
    <>
      <Sphere
        ref={sphereRef}
        args={[
          0.25, // radius
          32, // widthSegments
          32, // heightSegments
        ]}
      >
        <meshStandardMaterial
          color='lightblue'
          roughness={0.3}
          metalness={0.5}
        />
      </Sphere>
      <Torus
        ref={torusRef}
        args={[
          0.5, // radius
          0.05, // tube
          32, // radialSegments
          32, // tubularSegments
        ]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color='hotpink' roughness={0.3} metalness={0.5} />
      </Torus>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </>
  )
}

type FloatySphereProps = {
  children?: React.ReactNode
  debug?: boolean
}

export const FloatySphere = (props: FloatySphereProps) => (
  <DepthSection htmlOverlay={props.children} debug={props.debug}>
    <Suspense fallback={null}>
      <FloatySphereInner />
    </Suspense>
  </DepthSection>
)
