import React, { Suspense } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DepthSection } from './DepthSection'
import FragmentedBGMesh from '../FragmentedBGMesh/FragmentedBGMesh'
import { Canvas } from '@react-three/fiber'

type SetupProps = { children: React.ReactNode }

const Setup = (props: SetupProps) => (
  <div style={{ height: '300vh' }}>
    <div style={{ height: '80vh', color: 'white' }}>Scroll down...</div>
    <div style={{ height: '100vh' }}>
      <Canvas>{props.children}</Canvas>
    </div>
  </div>
)

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'DepthSection',
  component: DepthSection,
  decorators: [(storyFn) => <Setup>{storyFn()}</Setup>],
} as ComponentMeta<typeof DepthSection>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DepthSection> = (args) => (
  <DepthSection debug />
)

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {}
