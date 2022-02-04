import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useThree, Canvas } from '@react-three/fiber'
import { Debugger } from '../Debugger/Debugger'

export type DepthSectionProps = {
  // children?: JSX.IntrinsicElements['group'] | JSX.IntrinsicElements['mesh']
  children: React.ReactNode | null
  debug?: boolean
}

type RenderVars = {
  /** Height of the viewport in meters */
  hv: number
  /** How far the top fo the canvas is from the top of the viewport in pixels */
  t: number
  /** Height of the canvas in pixels */
  hc: number
  /** Height of the window (viewport) in pixels */
  hw: number
  /** How many children the mesh has. This is used to determine if the GLTF model has been loaded. */
  meshChildCount: number
}

const DepthSectionInner = (props: DepthSectionProps) => {
  const meshRef = useRef<THREE.Group>(null)

  const threeState = useThree()

  const canvas = threeState.gl.domElement

  const renderVarsRef = useRef<RenderVars>({
    hv: 1,
    t: 1,
    hc: 1,
    hw: 1,
    meshChildCount: 0,
  })
  const isVisible = useRef<boolean>(false)

  const renderFrame = () =>
    threeState.gl.render(threeState.scene, threeState.camera)

  const animate = (observer: IntersectionObserver) => {
    // We need to queue up a call to animate() on the next frame,
    // regardless of whether or not this frame gets rendered.
    requestAnimationFrame(() => animate(observer))

    // Skip re-rendering if:
    // 1. No mesh is provided
    // 2. The canvas is not visible on the page
    // 3. None of the variables used to render have changed and the mesh hasn't changed

    // 1. No mesh is provided
    const mesh = meshRef.current
    if (!mesh) return

    // 2. The canvas is not visible on the page.
    if (!isVisible.current) return

    // 3. None of the variables used to render have changed and the mesh hasn't changed

    const hv = threeState.viewport.height
    const t = canvas.getBoundingClientRect().top
    const hc = threeState.size.height
    const hw = window.innerHeight
    const meshChildCount = mesh.children.length

    if (
      hv === renderVarsRef.current.hv &&
      t === renderVarsRef.current.t &&
      hc === renderVarsRef.current.hc &&
      hw === renderVarsRef.current.hw &&
      // TODO: If possible, find a better way of checking if the mesh has changed
      meshChildCount === renderVarsRef.current.meshChildCount
    ) {
      // There's no need to render because nothing has changed.
      return
    }

    // At this point, we know we need to re-render.

    // Update the renderVarsRef
    renderVarsRef.current = { hv, t, hc, hw, meshChildCount }

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

    renderFrame()
  }

  useEffect(() => {
    // Set up an intersection observer to detect if the canvas is visible
    // on the page and change the `isVisible` ref accordingly.
    const observerCB: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => (isVisible.current = entry.isIntersecting))
    }
    const observer = new IntersectionObserver(observerCB)
    observer.observe(canvas)
    animate(observer)
  }, [])

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
  <Canvas
    // `frameloop` gets set to `never` because we will control it manually with `animate()`.
    frameloop='never'
  >
    <DepthSectionInner {...props} />
  </Canvas>
)
