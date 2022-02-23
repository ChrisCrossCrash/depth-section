import { DepthSection } from '../../core/DepthSection/DepthSection'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { getCameraAimPosY } from '../../utils/getCameraAimPos'

const TheGridInner = () => {
  const { scene } = useThree()
  scene.background = new THREE.Color('#000')

  const vertices = []

  const size: { x: number; y: number; z: number } = { x: 100, y: 100, z: 20 }

  for (let z = 0; z <= size.z; z += 1) {
    for (let y = 0; y <= size.y; y += 1) {
      for (let x = 0; x <= size.x; x += 1) {
        vertices.push(x - size.x / 2, y - size.y / 2, z - size.z)
      }
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(vertices, 3)
  )
  const material = new THREE.PointsMaterial({ size: 0.07 })
  const points = new THREE.Points(geometry, material)

  useFrame((state) => {
    points.position.y = getCameraAimPosY(state)
  })

  return (
    <>
      <primitive object={points} position={[0, 0, 0]} scale={0.5} />
    </>
  )
}

type TheGridProps = {
  children?: React.ReactNode
  debug?: boolean
}

export const TheGrid = (props: TheGridProps) => {
  return (
    <DepthSection htmlOverlay={props.children} debug={props.debug}>
      <TheGridInner />
    </DepthSection>
  )
}
