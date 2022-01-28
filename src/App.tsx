import { Canvas } from '@react-three/fiber'
import './App.css'
import { FragmentBG } from './components/FragmentBG/FragmentBG'

function App() {
  // const gltf = useLoader(GLTFLoader, '/donut.glb')
  return (
    <>
      <div id='three-wrapper'>
        <Canvas camera={{ fov: 55 }}>
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <FragmentBG />
        </Canvas>
      </div>
      <div
        style={{
          height: '100vh',
          // width: '100%',
          margin: '0 auto',
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <h1 style={{ fontSize: '8rem', margin: 0 }}>Hello</h1>
        <p style={{ fontSize: '1.5rem' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis laborum
          quia cumque repudiandae. Ad labore atque porro accusamus alias sint
          culpa reiciendis, illum quae. Perferendis voluptates eaque suscipit
          repellat sequi.
        </p>
      </div>
      <div style={{ height: '100vh' }}>Page 2</div>
    </>
  )
}

export default App
