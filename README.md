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

## Roadmap

- [ ] Add more 3D backgrounds
- [ ] Improve performance by not updating when the background isn't visible or isn't moving
- [ ] Make existing 3D backgrounds more customizable with props
- [ ] Improve Storybook integration
- [ ] Investigate issues caused by viewport height changes on mobile devices. Resources:
  - [CSS Tricks: CSS fix for 100vh in mobile WebKit](https://css-tricks.com/css-fix-for-100vh-in-mobile-webkit/)
  - [CSS Tricks: The trick to viewport units on mobile](https://css-tricks.com/the-trick-to-viewport-units-on-mobile/)
  - [Stack Overflow: CSS3 100vh not constant in mobile browser](https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser)
