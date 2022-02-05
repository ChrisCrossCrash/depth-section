import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useInView } from 'react-intersection-observer'
import { Debugger } from '../Debugger/Debugger'

export type DepthSectionProps = {
  // children?: JSX.IntrinsicElements['group'] | JSX.IntrinsicElements['mesh']
  children: React.ReactNode | null
  inView?: boolean
  debug?: boolean
}

const DepthSectionInner = (props: DepthSectionProps) => {
  const meshRef = useRef<THREE.Group>(null)

  const { invalidate } = useThree()
  useEffect(invalidate, [props.inView])

  useFrame((threeState) => {
    console.log('rendering...')
    const mesh = meshRef.current
    const canvas = threeState.gl.domElement

    if (!mesh || !props.inView) return

    /** Height of the viewport in meters */
    const hv = threeState.viewport.height
    /** How far the top fo the canvas is from the top of the viewport in pixels */
    const t = canvas.getBoundingClientRect().top
    /** Height of the canvas in pixels */
    const hc = threeState.size.height
    /** Height of the window (viewport) in pixels */
    const hw = window.innerHeight

    // Make the mesh move with the page scroll
    // (I'm not really sure how this works, but it does)
    mesh.position.y = (-hv * (2 * t + hc - hw)) / (6 * hw)

    // Make the camera offset match the page scroll
    threeState.camera.setViewOffset(
      window.innerWidth,
      window.innerHeight * 3,
      canvas.getBoundingClientRect().left,
      // The offset is at:
      // 2 * window.innerHeight when the top of the canvas is just scrolling into view.
      // window.innerHeight when the canvas is centered on the page.
      // 0 after just scrolling past the canvas.
      window.innerHeight + canvas.getBoundingClientRect().top,
      threeState.size.width,
      threeState.size.height
    )

    threeState.invalidate()
  })

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {props.children}
      {props.debug && <Debugger />}
    </group>
  )
}

// We need to wrap the DepthSectionInner compponent with a `Canvas` so we can use
// R3F hooks in it.
/** A Three JS canvas with a custom GLTF background. */
export const DepthSection = (props: DepthSectionProps) => {
  const { ref, inView } = useInView()
  return (
    <Canvas frameloop='demand' ref={ref}>
      <DepthSectionInner inView={inView} {...props} />
    </Canvas>
  )
}
