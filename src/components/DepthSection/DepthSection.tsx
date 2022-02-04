import React, { useRef } from 'react'
import { useFrame, useThree, Canvas } from '@react-three/fiber'
import { Debugger } from '../Debugger/Debugger'

export type DepthSectionProps = {
  // children?: JSX.IntrinsicElements['group'] | JSX.IntrinsicElements['mesh']
  children: React.ReactNode | null
  debug?: boolean
}

const DepthSectionInner = (props: DepthSectionProps) => {
  const meshRef = useRef<any>(null!)

  const state = useThree()

  const canvas = state.gl.domElement

  useFrame((state) => {
    if (!meshRef.current) return
    const mesh = meshRef.current

    const hv = state.viewport.height
    const t = canvas.getBoundingClientRect().top
    const hc = state.size.height
    const hw = window.innerHeight

    // Make the mesh move with the page scroll
    // (I'm not really sure how this works, but it does)
    mesh.position.y = (-hv * (2 * t + hc - hw)) / (6 * hw)

    // Make the camera offset match the page scroll
    state.camera.setViewOffset(
      window.innerWidth,
      window.innerHeight * 3,
      canvas.getBoundingClientRect().left,
      // The offset is at:
      // 2 * window.innerHeight when the top of the canvas is just scrolling into view.
      // window.innerHeight when the canvas is centered on the page.
      // 0 after just scrolling past the canvas.
      window.innerHeight + canvas.getBoundingClientRect().top,
      state.size.width,
      state.size.height
    )
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
export const DepthSection = (props: DepthSectionProps) => (
  <Canvas>
    <DepthSectionInner {...props} />
  </Canvas>
)
