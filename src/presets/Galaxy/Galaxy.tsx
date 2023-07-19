import { DepthSection } from '../../core/DepthSection/DepthSection'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { getCameraAimPos } from '../../utils/getCameraAimPos'
import { gaussianRandom } from '../../utils/gaussianRandom'

const GalaxyInner = () => {
  const { scene } = useThree()
  scene.background = new THREE.Color('#000')

  const vertices = []

  for (let i = 0; i < 100000; i++) {
    const x = gaussianRandom(0, 0.8)
    const y = gaussianRandom(0, 0.1)
    const z = gaussianRandom(0, 0.8)

    vertices.push(x, y, z)
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(vertices, 3),
  )
  const material = new THREE.PointsMaterial({ size: 0.015 })
  const points = new THREE.Points(geometry, material)

  useFrame((state) => {
    const [x, y] = getCameraAimPos(state)
    points.position.x = x
    points.position.y = y
    points.rotation.y = state.clock.getElapsedTime() / 10
  })

  return <primitive object={points} />
}

type GalaxyProps = {
  children?: React.ReactNode
  debug?: boolean
}

export const Galaxy = (props: GalaxyProps) => {
  return (
    <DepthSection htmlOverlay={props.children} debug={props.debug}>
      <GalaxyInner />
    </DepthSection>
  )
}
