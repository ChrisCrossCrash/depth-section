# Depth Section

What's a depth section? The best way to learn is by checking out the [storybook examples](https://depth-section.vercel.app).

Depth sections add visual depth to your page with 3D elements that respond to the user's scroll position.

Stay tuned! New background models and features are on the way!

## Install

In your React project, run:

```
npm install depth-section three @react-three/fiber
```

Or

```
yarn add depth-section three @react-three/fiber
```

## Usage

```jsx
import { Fragmented } from 'depth-section'

const App = () => (
    <>
      <div style={{height: '100vh'}} />
      <div style={{height: '100vh'}}>
        <Fragmented />
      </div>
      <div style={{height: '100vh'}} />
    </>
  )
}

export default App
```

## Roadmap

### Render-on-Demand Performance Improvement

Do not update when the background isn't moving.

### Self-Hosting GLTF Files

Right now, the GLTF files used in the backgrounds can only be served from this repository's [Github Pages](https://chriscrosscrash.github.io/depth-section/). Users should be given the option to download the files and self-host them. Here are some options:

1. Simply pass a URL to the component. For example: `<Fragmented url='/fragmented.glb'>`. The user would have to manually download the file and put it in their `public` directory.
2. Provide a cli command which will download the files to a directory specified by the user. For example: `npm run depth-section --download public`. The user would then have to specify the directory where the files are located with an environment variable.

## Design Principles

`DepthSection` is the core component of the the library on which all other components are built. It has two main responsibilities:

- Render its `children` on a Three.js canvas with the camera offset needed to create a parallax effect when it is scrolled through the viewport. **`DepthSection` does not change the position of child elements**. It is the responsibility of the child element to adjust its own position in the world space. The `getCameraAimPos()` helper functions make this quite easy.
- Render its `htmlOverlay` prop inside of a container which fills 100% of the canvas's height and width.

`DepthSection`'s `children` are `@react-three/fiber` components. They are simply 3D elements that appear in the scene.

Let's see how we can use `DepthSection` to create a new 3D background:

```tsx
import { DepthSection } from '../DepthSection/DepthSection'
import type { GroupProps } from '@react-three/fiber'

/** The component to be exported to the application.
 *
 * This is very simplified. In a real component, you would probably want to at
 * least animate the mesh's vertical position to match the camera offset.
 */
export const TorusKnotSection = (props: { children?: React.ReactNode }) => (
  <DepthSection htmlOverlay={props.children}>
    <mesh>
      <torusKnotBufferGeometry />
      <meshStandardMaterial color='#ffff00' />
    </mesh>
    <ambientLight />
  </DepthSection>
)
```

And then in the application:

```tsx
import { TorusKnotSection } from 'depth-section'

/** An "About" section with a Depth Section background. */
const AboutSection = () => (
  <TorusKnotSection>
    <div className='about-section'>
      <h1>About</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod,
        nisi eu aliquam consectetur, nisl nisi consectetur nisl, eget tincidunt
        nisl nisl vitae nisl.
      </p>
    </div>
  </TorusKnotSection>
)
```
