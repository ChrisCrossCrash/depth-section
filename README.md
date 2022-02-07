# Depth Section

Easy to use 3D models for your page with a parallax scrolling effect.

Stay tuned! New background models and features are on the way!

## Install

In your React project, run:

```
npm install depth-section three
```

Or

```
yarn add depth-section three
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

### Viewport Height Bug

Changes in the vertical height on mobile devices causes the canvas to be resized, resulting in the mesh jumping around. Resources:

- [CSS Tricks: CSS fix for 100vh in mobile WebKit](https://css-tricks.com/css-fix-for-100vh-in-mobile-webkit/)
- [CSS Tricks: The trick to viewport units on mobile](https://css-tricks.com/the-trick-to-viewport-units-on-mobile/)
- [Stack Overflow: CSS3 100vh not constant in mobile browser](https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser)

## Design Principles

`DepthSection` is the core component of the the library on which all other components are built. It has two main responsibilities:

- Render its `children` on a Three.js canvas with the position and camera offset needed to create a parallax effect when it is scrolled through the viewport.
- Render its `htmlOverlay` prop inside of a container which fills 100% of the canvas's height and width.

`DepthSection`'s `children` are `@react-three/fiber` components. They don't contain any fancy animation logic relating to the parallax scrolling effect. They are simply 3D elements that appear in the scene.

Let's see how we can use `DepthSection` to create a new 3D background:

```tsx
import { DepthSection } from '../DepthSection/DepthSection'
import type { GroupProps } from '@react-three/fiber'

/** The component to be exported to the application. */
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
