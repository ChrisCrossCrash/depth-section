import { Suspense, useRef } from 'react'
import { DepthSection } from '../../core/DepthSection/DepthSection'
import { getCameraAimPos } from '../../utils/getCameraAimPos'
import RPlaceModel from './RPlaceModel'
import { useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

const RPlaceInner = () => {
  const rPlaceRef = useRef<THREE.Group>(null)

  useFrame((threeState) => {
    getCameraAimPos(threeState)
    const rPlaceMesh = rPlaceRef.current

    if (!rPlaceMesh) return

    const [x, y] = getCameraAimPos(threeState)

    rPlaceMesh.position.y = y
    rPlaceMesh.position.x = x
  })

  return (
    <>
      <Suspense fallback={null}>
        <group ref={rPlaceRef}>
          <RPlaceModel
            scale={[40, 10, 40]}
            position={[0, 0, -1]}
            rotation={[Math.PI / 2, 0, 0]}
          />
        </group>
      </Suspense>
      <Suspense fallback={null}>
        <Environment files='/lebombo_1k.hdr' />
      </Suspense>
    </>
  )
}

// TODO: Get rid of this `any`
type RPlaceProps = any

export const RPlace = (props: RPlaceProps) => {
  return (
    <DepthSection htmlOverlay={props.children} debug={props.debug}>
      <RPlaceInner />
    </DepthSection>
  )
}
