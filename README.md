# Depth Section (working title)

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
    <div>
      <div style={{height: '100vh'}} />
      <div style={{height: '100vh'}}>
        <Fragmented />
      </div>
      <div style={{height: '100vh'}} />
    </div>
  )
}

export default App
```
