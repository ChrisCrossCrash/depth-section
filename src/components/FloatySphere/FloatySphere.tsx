import { Suspense, useRef } from 'react'
import { DepthSection } from '../DepthSection/DepthSection'
import * as THREE from 'three'
import { Sphere, Torus } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const FloatySphereInner = () => {
  const sphereRef = useRef<THREE.Mesh>(null)
  const torusRef = useRef<THREE.Mesh>(null)

  useFrame((threeState) => {
    const sphereMesh = sphereRef.current
    const torusMesh = torusRef.current

    if (!sphereMesh || !torusMesh) return

    const o = threeState.gl.domElement.getBoundingClientRect().top
    const w = window.innerHeight
    /** The scroll porgress, where -1 is entering an 1 is leaving screen. */
    const mappedProgress = (w - o) / w - 1
    // What is shown on the canvas is the subcam, which is 1/3 of the full
    // camera height, so we must divide viewport.height by 3 to get the height
    // of the subcam view in meters.
    const cameraAimHeight = (mappedProgress * threeState.viewport.height) / 3

    torusMesh.position.y = cameraAimHeight
    sphereMesh.position.y = THREE.MathUtils.lerp(
      cameraAimHeight,
      sphereMesh.position.y,
      0.85
    )
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
