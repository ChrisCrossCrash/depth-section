import React, { useEffect } from 'react'
import { Canvas, Object3DNode, useFrame, useThree } from '@react-three/fiber'
import { InView } from 'react-intersection-observer'
import { Debugger } from '../Debugger/Debugger'
import { useGetVh } from '../../utils/useGetVh'

export type DepthSectionProps = {
  /**
   * The 3D scene to render in the Depth Section
   *
   * For best results with the default camera settings, the scene should be centered on
   * the world origin with a height of 2.56 meters on the xy plane.
   */
  children: Object3DNode<any, any> | null
  /** Render a debug mesh into the scene and log some extra information into the console */
  debug?: boolean
  /** The HTML content to be displayed in the DepthSection */
  htmlOverlay?: React.ReactNode
}

type DepthSectionInnerProps = Omit<DepthSectionProps, 'htmlOverlay'> & {
  inView: boolean
}

const DepthSectionInner = (props: DepthSectionInnerProps) => {
  // Trigger `invalidate()` when `inView` changes.
  // This restarts the render loop when the DepthSection comes back into view.
  const { invalidate } = useThree()
  useEffect(invalidate, [props.inView])

  const getVh = useGetVh()

  useFrame(({ size, ...threeState }) => {
    const canvas = threeState.gl.domElement
    const { top, left } = canvas.getBoundingClientRect()

    // Stop the render loop when the DepthSection is not in view.
    if (!props.inView) return

    /** Height of the window (viewport) in pixels */
    const fullVh = getVh()

    // Make the camera offset match the page scroll
    threeState.camera.setViewOffset(
      window.innerWidth,
      fullVh * 3,
      left,
      // The offset is at:
      // 2 * window.innerHeight when the top of the canvas is just scrolling into view.
      // window.innerHeight when the canvas is centered on the page.
      // 0 after just scrolling past the canvas.
      fullVh + top,
      size.width,
      size.height
    )

    threeState.invalidate()
  })

  return (
    <>
      {props.children}
      {props.debug && <Debugger />}
    </>
  )
}

// We need to wrap the DepthSectionInner compponent with a `Canvas` so we can use
// R3F hooks in it.
/** A Three JS canvas with a custom GLTF background. */
export const DepthSection = (props: DepthSectionProps) => (
  <InView as='div'>
    {({ inView, ref }) => (
      <div
        ref={ref}
        style={{ position: 'relative', height: '100%', width: '100%' }}
      >
        <Canvas frameloop='demand'>
          <DepthSectionInner inView={inView} {...props} />
        </Canvas>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
          }}
        >
          {props.htmlOverlay}
        </div>
      </div>
    )}
  </InView>
)
