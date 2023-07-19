import { DepthSection } from '../../core/DepthSection/DepthSection'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { getCameraAimPosY } from '../../utils/getCameraAimPos'

const StarsInner = () => {
  const { scene } = useThree()
  scene.background = new THREE.Color('#000')

  const vertices = []

  for (let i = 0; i < 10000; i++) {
    const x = THREE.MathUtils.randFloatSpread(20)
    const y = THREE.MathUtils.randFloatSpread(20)
    const z = 1 + Math.random() * -20

    vertices.push(x, y, z)
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(vertices, 3),
  )
  const material = new THREE.PointsMaterial({ size: 0.1 })
  const points = new THREE.Points(geometry, material)

  useFrame((state) => {
    points.position.y = getCameraAimPosY(state)
  })

  return <primitive object={points} />
}

type StarsProps = {
  children?: React.ReactNode
  debug?: boolean
}

export const Stars = (props: StarsProps) => {
  return (
    <DepthSection htmlOverlay={props.children} debug={props.debug}>
      <StarsInner />
    </DepthSection>
  )
}
