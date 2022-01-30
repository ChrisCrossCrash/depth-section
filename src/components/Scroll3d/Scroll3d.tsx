import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

const Debugger = () => {
  const { viewport, size } = useThree()

  const heightFraction = size.height / window.innerHeight / 3

  return (
    <>
      <mesh>
        <planeBufferGeometry
          attach='geometry'
          args={[
            viewport.width * 0.333,
            viewport.height * heightFraction,
            4,
            4,
          ]}
        />
        <meshBasicMaterial attach='material' color='red' wireframe />
      </mesh>
      <mesh position={[0, 0, -1]}>
        <planeBufferGeometry
          attach='geometry'
          args={[
            viewport.width * 0.333,
            viewport.height * heightFraction,
            4,
            4,
          ]}
        />
        <meshBasicMaterial attach='material' color='blue' wireframe />
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
      0,
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
      {/* {props.debug && <Debugger />} */}
    </group>
  )
}
