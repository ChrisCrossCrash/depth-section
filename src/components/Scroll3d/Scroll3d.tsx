import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

const Debugger = () => {
  const { viewport } = useThree()
  return (
    <>
      <mesh>
        <planeBufferGeometry
          attach='geometry'
          args={[viewport.width * 0.333, viewport.height * 0.333, 4, 4]}
        />
        <meshBasicMaterial attach='material' color='red' wireframe />
      </mesh>
      <mesh position={[0, 0, -1]}>
        <planeBufferGeometry
          attach='geometry'
          args={[viewport.width * 0.333, viewport.height * 0.333, 4, 4]}
        />
        <meshBasicMaterial
          attach='material'
          color='blue'
          opacity={0.2}
          wireframe
        />
      </mesh>
    </>
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

    // TODO: The canvas needs to be 100vh for this to work. Make it work with any height.

    // Make the mesh move with the page scroll
    mesh.position.y =
      (-state.viewport.height * canvas.getBoundingClientRect().top) /
      (3 * window.innerHeight)

    // Make the camera offset match the page scroll
    state.camera.setViewOffset(
      window.innerWidth,
      window.innerHeight * 3,
      0,
      // The offset is at:
      // 2 * window.innerHeight when the top of the canvas is just scrolling into view.
      // window.innerHeight when the canvas is centered on the page.
      // 0 after just scrolling past the canvas.
      window.innerHeight + canvas.getBoundingClientRect().top,
      window.innerWidth,
      window.innerHeight
    )
  })

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* {props.children} */}
      {props.debug && <Debugger />}
    </group>
  )
}
