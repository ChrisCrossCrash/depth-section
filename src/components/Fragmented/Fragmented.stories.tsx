import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Fragmented } from './Fragmented'

type SetupProps = { children: React.ReactNode }

const Setup = (props: SetupProps) => (
  <div style={{ height: '300vh' }}>
    <div style={{ height: '80vh', color: 'white' }}>Scroll down...</div>
    <div style={{ height: '100vh' }}>{props.children}</div>
  </div>
)

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Fragmented',
  component: Fragmented,
  decorators: [(storyFn) => <Setup>{storyFn()}</Setup>],
} as ComponentMeta<typeof Fragmented>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Fragmented> = (args) => <Fragmented />

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {}
Default.parameters = {
  docs: {
    source: {
      code: 'Disabled for this story, see https://github.com/storybookjs/storybook/issues/11554',
    },
  },
}
