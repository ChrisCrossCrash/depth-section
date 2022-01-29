import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

type FragmentBGProps = {
  // children?: JSX.IntrinsicElements['group'] | JSX.IntrinsicElements['mesh']
  children: React.ReactNode | null
}

export const Scroll3d = (props: FragmentBGProps) => {
  const meshRef = useRef<any>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const scrollPx = document.documentElement.scrollTop
    const canvasHeightPx = state.size.height
    const scrollRatio = scrollPx / canvasHeightPx
    const mesh = meshRef.current

    const calculatedOffset =
      window.innerHeight - window.innerHeight * scrollRatio

    mesh.position.y = state.viewport.height * scrollRatio * (1 / 3)

    // Make the camera offset match the page scroll
    state.camera.setViewOffset(
      window.innerWidth,
      window.innerHeight * 3,
      0,
      // The offset should decrease as the scroll increases.
      calculatedOffset,
      window.innerWidth,
      window.innerHeight
    )
  })

  return <group ref={meshRef}>{props.children}</group>
}
