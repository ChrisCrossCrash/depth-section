import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

const Debugger = () => {
  const { viewport } = useThree()
  return (
    <mesh>
      <planeBufferGeometry
        attach='geometry'
        args={[viewport.width * 0.333, viewport.height * 0.333, 8, 8]}
      />
      <meshBasicMaterial attach='material' color='red' wireframe />
    </mesh>
  )
}

type FragmentBGProps = {
  // children?: JSX.IntrinsicElements['group'] | JSX.IntrinsicElements['mesh']
  children: React.ReactNode | null
  debug?: boolean
}

export const Scroll3d = (props: FragmentBGProps) => {
  const meshRef = useRef<any>(null!)

  const state = useThree()

  const canvas = state.gl.domElement

  useFrame((state) => {
    if (!meshRef.current) return
    const mesh = meshRef.current
    /**The position of the top of the canvas relative to the top of the page.  */
    const canvasTopPx = canvas.getBoundingClientRect().top + window.scrollY

    /** Scroll position where the offset should be 0 */
    const offsetStart = canvasTopPx - window.innerHeight

    const subCamHeightMeters = state.viewport.height / 3

    const scrollMultiplier = (window.scrollY - offsetStart) / window.innerHeight

    // Make the mesh move with the page scroll
    mesh.position.y =
      subCamHeightMeters * scrollMultiplier * 2 - subCamHeightMeters * 2
    // This seems to be working correctly. The perspective chages the correct amount.
    // Now, we just need to make the mesh move with the camera offset.
    // Make the camera offset match the page scroll
    state.camera.setViewOffset(
      window.innerWidth,
      window.innerHeight * 3,
      0,
      // The offset should decrease as the scroll increases.
      // Whatever goes here needs to lock the debug grid to the scrollbar position
      window.innerHeight - (scrollMultiplier - 1) * window.innerHeight * 2,
      window.innerWidth,
      window.innerHeight
    )
  })

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {props.children}
      {props.debug && <Debugger />}
    </group>
  )
}
